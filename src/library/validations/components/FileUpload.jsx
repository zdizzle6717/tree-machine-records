'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import accepts from 'attr-accept';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import FormActions from '../actions/FormActions';
import {addErrorMessage, findFormName, removeErrorMessage, getInput, range} from '../utilities';

// TODO: Drag & Drop functionality
// TODO: Consider allowing for single file as object, NOT array
// TODO: Consider adding alerts option to display alert for new errors

const mapStateToProps = (state) => {
	return {
		'forms': state.forms
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'addInput': FormActions.addInput,
		'removeInput': FormActions.removeInput
	}, dispatch);
}

class FileUpload extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'name': null,
			'value': null,
			'formName': null,
			'valid': true,
			'initial': true,
			'file': {},
			'files': [],
			'filesUploaded': [],
			'formName': '',
			'maxFiles': props.maxFiles,
			// File size is multiplied to allow input in MB's
			'minSize': props.minSize * Math.pow(1024, 2),
			'maxSize': props.maxSize * Math.pow(1024, 2),
			'showFileList': false,
			'touched': false,
			'pristine': true,
			'errors': [],
			'focused': false,
			'blurred': false
		};

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.toggleFileList = this.toggleFileList.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateFiles = this.validateFiles.bind(this);
		this.updateErrorMessages = this.updateErrorMessages.bind(this);
		this.verifyFileType = this.verifyFileType.bind(this);
	}

	componentDidMount() {
		if (this.props.typeOfModel === 'object' && this.props.multiple) {
			throw new Error(' Oops! If typeOfModel is an object, multiple prop must be false. (FileUpload.js)')
		}
		if (this.props.required && this.props.required > this.state.maxFiles) {
			throw new Error(' Oops! Total required files must be less than the max total files allows. (FileUpload.js)');
		}
		this.validateInit(this.props);
	}

	// Accounts for initial data check and conditionally required inputs
	componentWillReceiveProps(nextProps) {
		let initialValue = this.props.typeOfModel === 'object' ? (nextProps.value ? nextProps.value.name : false) : (nextProps.value ? nextProps.value[0] : false);
		if (this.state.initial && this.state.pristine && initialValue) {
			this.validateInit(nextProps, true);
		}
	}

	// TODO: Test if this will work as expected
	// shouldComponentUpdate(nextProps, nextState) {
	// 	if (nextProps.value !== this.props.value || nextState.value !== this.state.value) {
	// 		return true;
	// 	}
	// 	for (let prop in nextState) {
	// 		if (nextState[prop] !== this.state[prop]) {
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// }

	// This will update validation in the case that an input is conditionally visible
	componentWillUnmount() {
		if (!this.props.preserveState) {
			let input = {
				'name': this.props.name,
				'formName': this.state.formName
			}
			setTimeout(() => {
				this.props.removeInput(input);
			});
		}
	}

	// This checks the validation of any input containing data on first render
	validateInit(props, propsHaveLoaded = false) {
		let elem = ReactDOM.findDOMNode(this);
		let formName = findFormName(elem);
		let existingInput = propsHaveLoaded ? false : getInput(props.forms, formName, props.name);
		if (existingInput) {
			this.setState(existingInput);
			return;
		}
		let input = {
			'name': props.name,
			'value': props.value,
			'formName': formName
		};
		input.files = this.props.typeOfModel === 'object' ? (props.value ? [props.value] : []) : (props.value || []);
		let message = props.required > 1 ? `At least ${props.required} files are required.` : `At least 1 file is required`;
		this.updateErrorMessages(input, (props.required ? (input.files.length >= props.required ? true : false) : true), 'filesRequired', message);
		if (propsHaveLoaded) {
			input.initial = false;
		}
		input = Object.assign({}, this.state, input);
		this.setState(input);
		setTimeout(() => {
			this.props.addInput(input);
		});
	}

	validateFiles(e) {
		e.preventDefault();
		let input = {
			'name': e.target.name,
			'initial': false,
			'pristine': false
		}
		let incomingFiles = e.target.files;
		let unAcceptedFileSize = false;
		let existingFiles = this.state.files;
		let existingFileNames = existingFiles.map((file) => {
			return file.name;
		});
		let uploadReadyFiles = [];
		let filesUploaded = this.state.filesUploaded;

		// Verify accepted file types if any are set
		if (this.props.accept) {
			for (let i = 0; i < incomingFiles.length; i++) {
				if (!this.verifyFileType(incomingFiles[i])) {
					this.updateErrorMessages(input, false, 'unAcceptedFileType', `Accepted file type(s): ${this.props.accept}`);
					return;
				}
			}
		}
		this.updateErrorMessages(input, true, 'unAcceptedFileType', `Accepted file type(s): ${this.props.accept}`);

		// Verify file size restrictions if any are set (props should be set in mb)
		for (let i = 0; i < incomingFiles.length; i++) {
			if (incomingFiles[i].size < this.state.minSize || incomingFiles[i].size > this.state.maxSize) {
				this.updateErrorMessages(input, false, 'unAcceptedFileSize', `File size must be between ${this.state.minSize / Math.pow(1024, 2)}MB and ${this.state.maxSize / Math.pow(1024, 2)}MB`);
				return;
			}
		}
		this.updateErrorMessages(input, true, 'unAcceptedFileSize', `File size must be between ${this.state.minSize / Math.pow(1024, 2)}MB and ${this.state.maxSize / Math.pow(1024, 2)}MB`);

		// Show error and cancel upload if max files allowed is exceeded
		if (this.props.typeOfModel === 'array') {
			if (this.state.files.length + incomingFiles.length > this.state.maxFiles) {
				this.updateErrorMessages(input, (this.state.files.length + incomingFiles.length <= this.state.maxFiles), 'maxFilesExceeded', `Max file count is ${this.state.maxFiles}.`);
				return;
			}
			this.updateErrorMessages(input, true, 'maxFilesExceeded', `Max file count is ${this.state.maxFiles}.`);
		}

		// Update new file list after checking for duplicate file names
		// BUG: Selecting 2 consecutive files (in Google Chrome) of the same name and file size seems to skip this step ???
		for (let i = 0; i < incomingFiles.length; i++) {
			if (existingFiles.length === 0) {
				existingFiles.push(incomingFiles[i]);
			} else if (this.props.typeOfModel === 'object') {
				let replaceFile = window.confirm(`Overwrite the current file?`);
				if (replaceFile) {
					existingFiles[0] = incomingFiles[i];
					uploadReadyFiles.push(incomingFiles[i]);
				}
			} else if (this.props.typeOfModel === 'array') {
				if (existingFileNames.indexOf(incomingFiles[i].name) !== -1) {
					let replaceFile = window.confirm(`A file with that name already exists. Overwrite this file?`);
					if (replaceFile) {
						existingFiles[existingFileNames.indexOf(incomingFiles[i].name)] = incomingFiles[i];
						uploadReadyFiles.push(incomingFiles[i]);
					}
				} else {
					existingFiles.push(incomingFiles[i]);
				}
			}
		}

		// Send all new files (as an array) to parent component where upload will be handled
		existingFiles.forEach((file) => {
			if (existingFileNames.indexOf(file.name) === -1) {
				uploadReadyFiles.push(file);
				filesUploaded.push(file);
			}
		});
		if (uploadReadyFiles.length > 0) {
			this.props.handleFileUpload(uploadReadyFiles);
		}

		// This is simply a name change to be more explicit/organized
		let updatedFiles = existingFiles;

		// Update state of validity
		let message = this.props.required > 1 ? `At least ${this.props.required} files are required.` : `At least 1 file is required`;
		this.updateErrorMessages(input, (this.props.required ? (updatedFiles.length >= this.props.required ? true : false) : true), 'filesRequired', message);

		if (!this.state.showFileList) {
			this.toggleFileList();
		}
		input.value = updatedFiles;
		input.filesUploaded = filesUploaded;
		input.files = updatedFiles;
		input = Object.assign({}, this.state, input);
		this.setState(input);
		this.props.addInput(input);
	}

	verifyFileType(file) {
		return accepts(file, this.props.accept);
	}

	// TODO: In order to upload files only after 'submit' button is clicked
	// this will have to notify the parent component that the upload ready files array has changed...
	handleRemoveFile(index) {
		let input;
		let files = this.state.files;
		files.splice(index, 1);
		let value = this.props.typeOfModel === 'object' ? files[0] : files;
		input = {
			'name': this.props.name,
			'value': value,
			'files': files
		};
		let message = this.props.required > 1 ? `At least ${this.props.required} files are required.` : `At least 1 file is required.`;
		this.updateErrorMessages(input, (this.props.required ? (files.length >= this.props.required ? true : false) : true), 'filesRequired', message);
		this.updateErrorMessages(input, true, 'maxFilesExceeded');
		input = Object.assign({}, this.state, input);
		this.setState(input);
		this.props.addInput(input);
		return files;
	}

	handleDeleteFile(file, index) {
		this.handleRemoveFile(index);
		this.props.handleDeleteFile(file.id);
	}

	updateErrorMessages(input, condition, key, text) {
		let newErrorMessages = [], validity = true;
		if (!condition) {
			let errorText = text || defaultValidations[this.props.validate].message;
			newErrorMessages = addErrorMessage(this.state.errors, key, errorText);
		} else {
			newErrorMessages = removeErrorMessage(this.state.errors, key);
		}
		newErrorMessages.forEach((error) => {
			if (error.key === 'filesRequired') {
				validity = false;
			}
		})
		input.errors = newErrorMessages;
		input.valid = validity;
		input = Object.assign({}, this.state, input);
		this.setState(input);
		setTimeout(() => {
			this.props.addInput(input);
		});
	}

	handleMouseDown() {
		let input = Object.assign({}, this.state, {'touched': true});
		this.setState(input);
		this.props.addInput(input);
	}

	handleFocus() {
		let input = Object.assign({}, this.state, {'focused': true, 'blurred': false});
		this.setState(input);
		this.props.addInput(input);
	}

	handleBlur() {
		let input = Object.assign({}, this.state, {'focused': false, 'blurred': true});
		this.setState(input);
		this.props.addInput(input);
	}

	toggleFileList(e) {
		if (e) {
			e.preventDefault();
		}
		let input = Object.assign({}, this.state, {'showFileList': !this.state.showFileList});
		this.setState(input);
	}

	render() {
		let validationClasses = classNames({
			'file-upload': true,
			'valid': this.state.valid,
			'invalid': !this.state.valid,
			'touched': this.state.touched,
			'untouched': !this.state.touched,
			'pristine': this.state.pristine,
			'focused': this.state.focused,
			'blurred': this.state.blurred,
			'dirty': !this.state.pristine,
			'disabled': this.props.disabled
		});

		let errorClasses = classNames({
			'file-upload-errors': true,
			'dirty': !this.state.pristine
		});

		let fileContainerClasses = classNames({
			'file-container': true,
			'show':  this.state.maxFiles > 1
		});

		let fileListClasses = classNames({
			'file-list': true,
			'show': this.state.showFileList
		});

		return (
			<div className="upload-container">
				<div className={validationClasses}>
					<label htmlFor={this.props.name} onMouseDown={this.handleMouseDown} >Browse Files...</label>
					<div className="file-count">{ this.state.files.length || 0}{this.props.required ? '/' : ''}
						{this.props.required ? this.props.required : ''}</div>
					<input type="file" name={this.props.name} id={this.props.name} onChange={this.validateFiles} onFocus={this.handleFocus} onBlur={this.handleBlur} accept={this.props.accept} multiple={this.props.multiple} disabled={this.props.disabled}/>
				</div>
				{
					!this.props.hideFileList &&
					<div className="file-info">
						<div className={fileContainerClasses}>
							<button className="button info toggle-list" onClick={this.toggleFileList}>
								{ this.state.showFileList ? <span className="fa fa-minus"></span> : <span className="fa fa-plus"></span>} { this.state.showFileList ? 'Hide File List' : 'Show File List'}
							</button>
							{
								this.state.files.length < 1 && this.state.showFileList ?
								<div className="help-text">Drag & drop files or click above to browse for files</div> :
								<div className={fileListClasses}>
									<table className="file-list-table">
			 							<thead>
			 								<tr>
			 									<th>File Name</th>
			 									<th>Type</th>
			 									<th>Size</th>
			 									<th className="remove-file-header">Remove?</th>
			 									<th className="remove-file-header">Delete?</th>
			 								</tr>
			 							</thead>
										<tbody>
											{this.state.files.map((file, i) => <tr key={i} name="file.name">
												<td>{file.name}</td>
												<td>{file.type}</td>
												<td>{(file.size / Math.pow(1024, 2)).toFixed(2)}MB</td>
												<td className="remove-file"><span className="fa fa-minus" onClick={this.handleRemoveFile.bind(this, i)}></span></td>
												{
													file.id && this.props.handleDeleteFile &&
													<td className="delete-file"><span className="fa fa-times" onClick={this.handleDeleteFile.bind(this, file, i)}></span></td>
												}
											</tr>)}
										</tbody>
			 						</table>
									<div className={errorClasses}>
										{this.state.errors.map((error, i) => <div key={i}>{error.message}</div>)}
									</div>
								</div>
							}
						</div>
					</div>
				}
				<div className={errorClasses}>
					{this.state.errors.map((error, i) => <div key={i}>{error.message}</div>)}
				</div>
			</div>
		)
	}
}

FileUpload.propTypes = {
	'name': PropTypes.string.isRequired,
	'fileName': PropTypes.string,
	'handleFileUpload': PropTypes.func.isRequired,
	'handleDeleteFile': PropTypes.func,
	'hideFileList': PropTypes.bool,
	'accept': PropTypes.string,
	'typeOfModel': PropTypes.string.isRequired,
	'multiple': PropTypes.bool,
	'maxFiles': PropTypes.number,
	'minSize': PropTypes.number,
	'maxSize': PropTypes.number,
	'preserveState': PropTypes.bool,
	'required': PropTypes.number,
	'disabled': PropTypes.bool
}

FileUpload.defaultProps = {
	'maxFiles': 5,
	'maxSize': 100,
	'minSize': 0,
	'multiple': false,
	'preserveState': false,
	'typeOfModel': 'array'
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileUpload));
