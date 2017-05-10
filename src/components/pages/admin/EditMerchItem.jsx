'use strict';

import React from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Form, Input, Select, TextArea, CheckBox, getFormErrorCount, RadioGroup, DatePicker, FileUpload} from '../../../library/validations';
import {handlers, uploadFiles} from '../../../library/utilities';
import {AlertActions} from '../../../library/alerts';
import AlbumReleaseActions from '../../../actions/AlbumReleaseActions';
import ArtistActions from '../../../actions/ArtistActions';
import MerchItemActions from '../../../actions/MerchItemActions';
import MerchItemService from '../../../services/MerchItemService';
import FileService from '../../../services/FileService';
import PriceOptionService from '../../../services/PriceOptionService';

// TODO: Add additional file upload specifically for digital downloads (auto set file/folder permisions, etc.)
// TODO: Make artist/album release optional if merch is not related to a specific artist

const mapStateToProps = (state) => {
	return {
		'albumReleases': state.albumReleases,
		'artists': state.artists,
		'merch': state.merch,
		'forms': state.forms
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'addAlert': AlertActions.addAlert,
		'getAlbumRelease': AlbumReleaseActions.get,
		'getArtist': ArtistActions.getById,
		'getArtists': ArtistActions.getAll,
		'getMerch': MerchItemActions.get
	}, dispatch);
}

class EditMerchItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'merchItem': {
				'isDisplayed': false,
				'isFeatured': false,
				'Files': []
			},
			'newMerchItem': false,
			'selectedArtist': undefined,
			'albumReleases': [],
			'newFiles': [],
			'priceOptions': [{
				'numItems': 1,
				'basePrice': 1
			}],
			'skuIsDisabled': false
        }

		this.addPriceOption = this.addPriceOption.bind(this);
		this.handleArtistChange = this.handleArtistChange.bind(this);
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.handleDeleteFile = this.handleDeleteFile.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.merchItemIsInvalid = this.merchItemIsInvalid.bind(this);
    }

    componentDidMount() {
        document.title = 'Tree Machine Records | Edit Merch';
		this.props.getArtists();
		if (this.props.params.merchId) {
			this.props.getMerch(this.props.params.merchId).then((merchItem) => {
				if (merchItem.ArtistId) {
					this.props.getArtist(merchItem.ArtistId).then((artist) => {
						this.setState({
							'selectedArtist': artist.param,
							'albumReleases': artist.AlbumReleases,
							'merchItem': merchItem,
							'priceOptions': merchItem.PriceOptions.length > 0 ? merchItem.PriceOptions : {
								'numItems': 1,
								'basePrice': 1
							}
						});
					});
				} else {
					this.setState({
						'merchItem': merchItem
					});
				}
			}).catch(() => {
				this.showAlert('merchItemNotFound');
				this.props.history.push('/dashboard');
			});
		} else {
			this.setState({
				'newMerchItem': true
			});
		}
    }

	addPriceOption() {
		let priceOptions = this.state.priceOptions;
		priceOptions.push({
			'numItems': 1,
			'basePrice': 1
		});

		this.setState({
			'priceOptions': priceOptions
		});
	}

	handleArtistChange(e) {
		let artistId = e.target.value;
		let merchItem = this.state.merchItem;
		this.props.getArtist(artistId).then((artist) => {
			merchItem.ArtistId = artist.id;
			this.setState({
				'albumReleases': artist.AlbumReleases,
				'merchItem': merchItem,
				'selectedArtist': artistId
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
			merchItem.Files = newFileList;
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

	handleDeleteFile(fileId) {
		FileService.remove(fileId).then(() => {
			this.showAlert('fileRemoved');
		});
	}

	handleSubmit(e) {
		let merchItem = this.state.merchItem;
		const savePriceOptions = (merchItemId) => {
			let promises = [];
			this.state.priceOptions.forEach((option) => {
				let method = option.id ? 'update' : 'create'
				let data = {
					'MerchItemId': merchItemId,
					'numItems': option.numItems,
					'basePrice': option.basePrice
				};
				promises.push(PriceOptionService[method](option.id ? option.id : data, option.id ? data : null));
			});
			return axios.all(promises);
		}
		if (this.state.newMerchItem) {
			MerchItemService.create(merchItem).then((merchItem) => {
				let promises = [];
				this.state.merchItem.Files.forEach((file, i) => {
					promises.push(FileService.create({
						'MerchItemId': merchItem.id,
						'identifier': 'productImage',
						'locationUrl': `artists/${this.state.selectedArtist}/merch/${this.state.merchItem.sku}/${this.state.merchItem.Files[i].name}`,
						'name': this.state.merchItem.Files[i].name,
						'size': this.state.merchItem.Files[i].size,
						'type': this.state.merchItem.Files[i].type
					}));
				});
				axios.all(promises).then(() => {
					let promises = [];
					savePriceOptions(merchItem.id).then(() => {
						this.showAlert('merchItemCreated');
						this.props.history.push('/dashboard');
					})
				});
			});
		} else {
			MerchItemService.update(merchItem.id, merchItem).then((response) => {
				let promises = [];
				let newFiles = this.state.newFiles;
				if (newFiles.length > 0) {
					this.state.merchItem.Files.forEach((file, i) => {
						promises.push(FileService.create({
							'MerchItemId': response.id,
							'identifier': 'productImage',
							'locationUrl': `artists/${this.state.selectedArtist}/merch/${this.state.merchItem.sku}/${this.state.merchItem.Files[i].name}`,
							'name': this.state.merchItem.Files[i].name,
							'size': this.state.merchItem.Files[i].size,
							'type': this.state.merchItem.Files[i].type
						}));
					});
					axios.all(promises).then(() => {
						let promises = [];
						savePriceOptions(merchItem.id).then(() => {
							this.showAlert('merchItemUpdated');
							this.props.history.push('/dashboard');
						});
					});
				} else {
					savePriceOptions(merchItem.id).then(() => {
						this.showAlert('merchItemUpdated');
						this.props.history.push('/dashboard');
					});
				}
			});
		}
	}

	merchItemIsInvalid() {
		let merchFormIsInvalid = getFormErrorCount(this.props.forms, 'merchForm') > 0;
		let priceOptionsAreInvalid = this.state.priceOptions.some((form, i) => {
			return getFormErrorCount(this.props.forms, `priceOptionForm-${i}`) > 0;
		});
		return merchFormIsInvalid || priceOptionsAreInvalid || this.state.priceOptions.length < 1;
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
			},
			'fileRemoved': () => {
				this.props.addAlert({
					'title': 'File Deleted',
					'message': `File was successfully deleted.`,
					'type': 'info',
					'delay': 3000
				});
			},
			'optionRemoved': () => {
				this.props.addAlert({
					'title': 'Price Option Removed',
					'message': `Price options was successfully removed form this merch item.`,
					'type': 'info',
					'delay': 3000
				});
			}
		}

		return alerts[selector]();
	}

	removePriceOption(index, id, e) {
		e.preventDefault();
		if (id) {
			PriceOptionService.remove(id).then(() => {
				this.showAlert('optionRemoved');
			})
		}
		let priceOptions = this.state.priceOptions;
		priceOptions.splice(index, 1);
		this.setState({
			'priceOptions': priceOptions
		})
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
					<Form name="merchForm" submitButton={false}>
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
											<option key={i} value={artist.id}>{artist.name}</option>
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
								<FileUpload name="productImages" value={this.state.merchItem.Files} handleFileUpload={this.handleFileUpload} handleDeleteFile={this.handleDeleteFile} maxFiles={10} required={1} disabled={!this.state.selectedArtist || !this.state.merchItem.sku}/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<CheckBox name="isDisplayed" value={this.state.merchItem.isDisplayed} handleInputChange={this.handleCheckBoxChange} label="Display in store?"/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<CheckBox name="isFeatured" value={this.state.merchItem.isFeatured} handleInputChange={this.handleCheckBoxChange} label="Feature this item?"/>
							</div>
						</div>
					</Form>
					<hr />
					{
						this.state.priceOptions.map((option) =>
							<Form name={`priceOptionForm-${i}`} submitButton={false}>
								<fieldset>
									<div className="row">
										<div className="form-group small-12 medium-6 columns">
											<label className="required">Number of Items</label>
											<Input type="text" name="numItems" value={this.state.priceOptions[i].numItems} handleInputChange={this.handlePriceInputChange} min={1} max={10} required={true}/>
										</div>
										<div className="form-group small-12 medium-6 columns">
											<label className="required">Base Price Per Item</label>
											<Input type="text" name="basePrice" value={this.state.priceOptions[i].basePrice} handleInputChange={this.handlePriceInputChange} min={1} required={true}/>
										</div>
									</div>
									{
										i > 0 &&
										<button className="button error" onClick={this.removePriceOption.bind(this, i, option.id)}><span className="fa fa-minus"></span></button>
									}
								</fieldset>
							</Form>
						)
					}
					<hr />
					<div className="form-group">
						<button className="button" onClick={this.addPriceOption}><span className="fa fa-plus"></span> Add Price Option</button>
					</div>
					<div className="small-12 columns">
						<button className="button primary" onClick={this.handleSubmit} disabled={this.merchItemIsInvalid()}>{this.state.newMerchItem ? 'Create Merch' : 'Update Merch'}</button>
					</div>
				</div>
			</div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditMerchItem));
