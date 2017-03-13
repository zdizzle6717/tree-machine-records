'use strict';

import React from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link, browserHistory } from 'react-router';
import {Form, Input, Select, TextArea, CheckBox, RadioGroup, DatePicker, FileUpload} from '../../../library/validations';
import {handlers, uploadFiles} from '../../../library/utilities';
import {AlertActions} from '../../../library/alerts';
import AlbumReleaseActions from '../../../actions/AlbumReleaseActions';
import ArtistActions from '../../../actions/ArtistActions';
import MerchItemActions from '../../../actions/MerchItemActions';
import FileService from '../../../services/FileService';

// TODO: Add additional file upload specifically for digital downloads (auto set file/folder permisions, etc.)
// TODO: Make artist/album release optional if merch is related to label

const mapStateToProps = (state) => {
	return {
		'merch': state.merch,
		'albumReleases': state.albumReleases,
		'artists': state.artists
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'addAlert': AlertActions.addAlert,
		'getArtist': ArtistActions.get,
		'getArtists': ArtistActions.getAll,
		'getMerch': MerchItemActions.get,
		'createMerch': MerchItemActions.create,
		'updateMerch': MerchItemActions.update
	}, dispatch);
}

class EditMerchPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'merchItem': {
				'isDisplayed': false,
				'isFeatured': false
			},
			'newMerchItem': false,
			'selectedArtist': undefined,
			'albumReleases': [],
			'newFiles': [],
			'skuIsDisabled': false
        }

		this.handleArtistChange = this.handleArtistChange.bind(this);
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
        document.title = 'Tree Machine Records | Edit Merch';
		this.props.getArtists();
		if (this.props.params.merchId) {
			this.props.getMerch(this.props.params.merchId).then((merchItem) => {
				this.setState({
					'merchItem': merchItem
				});
			}).catch(() => {
				this.showAlert('merchItemNotFound');
				browserHistory.push('/profile');
			});
		} else {
			this.setState({
				'newMerchItem': true
			});
		}
    }

	handleArtistChange(e) {
		let artistParam = e.target.value;
		this.props.getArtist(artistParam).then((artist) => {
			this.setState({
				'albumReleases': artist.AlbumReleases,
				'selectedArtist': artistParam
			});
		});
	}

	handleCheckBoxChange(e) {
		this.setState({
			'merchItem': handlers.updateCheckBox(e, this.state.merchItem)
		});
	}

	handleInputChange(e) {
		this.setState({
			'merchItem': handlers.updateInput(e, this.state.merchItem)
		});
	}

	handleFileUpload(files) {
		let merchItem = this.state.merchItem;
		let newFiles = this.state.newFiles;
		this.uploadFiles(files).then((responses) => {
			responses = responses.map((response, i) => {
				response = {
					'name': response.data.file.name,
					'size': response.data.file.size,
					'type': response.data.file.type
				};
				return response;
			});
			let newFileList = responses.concat(merchItem.Files);
			merchItem.Files = responses;
			newFiles = newFiles.concat(responses);
			this.setState({
				'merchItem': merchItem,
				'newFiles': newFiles,
				'skuIsDisabled': true
			});
		});
	}

	uploadFiles(files) {
		let directoryPath = `artists/${this.state.selectedArtist}/merch/${this.state.merchItem.sku}/`;
		return uploadFiles(files, '/files/add', directoryPath, {
			'identifier': 'productImage'
		});
	}

	handleSubmit(e) {
		let merchItem = this.state.merchItem;
		if (this.state.newMerchItem) {
			this.props.createMerch(merchItem).then((response) => {
				let promises = [];
				this.state.merchItem.Files.forEach((file) => {
					promises.push(FileService.create({
						'MerchItemId': response.id,
						'identifier': 'productImage',
						'imageUrl': `artists/${this.state.selectedArtist}/merch/${this.state.merchItem.sku}/${this.state.merchItem.Files[0].name}`,
						'name': this.state.merchItem.Files[0].name,
						'size': this.state.merchItem.Files[0].size,
						'type': this.state.merchItem.Files[0].type
					}));
				});
				axios.all(promises).then(() => {
					this.showAlert('merchItemCreated');
					browserHistory.push('/profile');
				});
			});
		} else {
			this.props.updateMerch(merchItem.id, merchItem).then((response) => {
				let promises = [];
				let newFiles = this.state.newFiles;
				if (newFiles.length > 0) {
					this.state.merchItem.Files.forEach((file) => {
						promises.push(FileService.create({
							'MerchItemId': response.id,
							'identifier': 'productImage',
							'imageUrl': `artists/${this.state.selectedArtist}/merch/${this.state.merchItem.sku}/${this.state.merchItem.Files[0].name}`,
							'name': this.state.merchItem.Files[0].name,
							'size': this.state.merchItem.Files[0].size,
							'type': this.state.merchItem.Files[0].type
						}));
					});
					axios.all(promises).then(() => {
						this.showAlert('merchItemUpdated');
						browserHistory.push('/profile');
					});
				} else {
					this.showAlert('merchItemUpdated');
					browserHistory.push('/profile');
				}
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'merchItemNotFound': () => {
				this.props.addAlert({
					'title': 'Merch Item Not Found',
					'message': `An album with params ${this.props.params.merchId} was not found.`,
					'type': 'error',
					'delay': 3000
				});
			},
			'merchItemCreated': () => {
				this.props.addAlert({
					'title': 'New Merch Added',
					'message': 'A new merch item was successfully created.',
					'type': 'success',
					'delay': 3000
				});
			},
			'merchItemUpdated': () => {
				this.props.addAlert({
					'title': 'Merch Item Updated',
					'message': `${this.state.merchItem.title} was updated successfully.`,
					'type': 'success',
					'delay': 3000
				});
			}
		}

		return alerts[selector]();
	}

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					{
						this.state.newMerchItem ?
						<h1 className="push-bottom-2x">Add New Merch</h1> :
						<h1 className="push-bottom-2x">Edit Merch Item: <strong>{this.state.merchItem.title}</strong></h1>
					}
					<hr />
					<Form name="merchForm" submitText={this.state.newMerchItem ? 'Create Merch' : 'Update Merch'} handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="form-group small-12 medium-3 columns">
								<label className="required">Title</label>
								<Input type="text" name="title" value={this.state.merchItem.title} handleInputChange={this.handleInputChange} required={true} />
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label className="required">Price ($ dollars)</label>
								<Input type="number" name="price" value={this.state.merchItem.price} handleInputChange={this.handleInputChange} validate="currency" required={true} />
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label className="required">SKU</label>
								<Input type="text" name="sku" value={this.state.merchItem.sku} handleInputChange={this.handleInputChange} required={true} disabled={this.state.skuIsDisabled}/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label className="required">Quantity</label>
								<Input type="number" name="qty" value={this.state.merchItem.qty} handleInputChange={this.handleInputChange} required={true} />
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Artist</label>
								<Select name="selectedArtist" value={this.state.selectedArtist} handleInputChange={this.handleArtistChange}>
									<option value="">--Select--</option>
									{
										this.props.artists.map((artist, i) =>
											<option key={i} value={artist.param}>{artist.name}</option>
										)
									}
								</Select>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Release Title</label>
								<Select name="AlbumReleaseId" value={this.state.merchItem.AlbumReleaseId} handleInputChange={this.handleInputChange}>
									<option value="">--Select--</option>
									{
										this.state.albumReleases.map((albumRelease, i) =>
											<option key={i} value={albumRelease.id}>{albumRelease.title}</option>
										)
									}
								</Select>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Format</label>
								<Select name="format" value={this.state.merchItem.format} handleInputChange={this.handleInputChange} required={true}>
									<option value="">--Select--</option>
									<option value='vinyl'>Vinyl</option>
									<option value='cds'>CDs</option>
									<option value='cassettes'>Cassettes</option>
									<option value='apparel'>Apparel</option>
									<option value='posters'>Posters</option>
									<option value='stickers'>Stickers</option>
									<option value='lighters'>Lighters</option>
									<option value='other'>Other</option>
								</Select>
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-6 columns">
								<label className="required">Short Description</label>
								<TextArea type="text" name="shortDescription" value={this.state.merchItem.shortDescription} handleInputChange={this.handleInputChange} required={true} />
							</div>
							<div className="form-group small-12 medium-6 columns">
								<label className="required">Description</label>
								<TextArea type="text" name="description" value={this.state.merchItem.description} rows="5" handleInputChange={this.handleInputChange} required={true} />
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-6 columns">
								<label className="required">Product Images</label>
								<FileUpload name="productImages" value={this.state.merchItem.Files} handleFileUpload={this.handleFileUpload} singleFile={false} maxFiles={1} required={1} disabled={!this.state.selectedArtist || !this.state.merchItem.sku}/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<CheckBox name="isDisplayed" value={this.state.merchItem.isDisplayed} handleInputChange={this.handleCheckBoxChange} label="Display in store?"/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<CheckBox name="isFeatured" value={this.state.merchItem.isFeatured} handleInputChange={this.handleCheckBoxChange} label="Feature this item?"/>
							</div>
						</div>
					</Form>
				</div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMerchPage);
