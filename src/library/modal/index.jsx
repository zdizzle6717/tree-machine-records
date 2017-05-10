'use strict';

import React from 'react';
import classNames from 'classnames';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

    render() {
		let containerClasses = classNames({
			'modal-container': true,
			'show': this.props.modalIsOpen
		});
		let backdropClasses = classNames({
			'modal-backdrop': true,
			'show': this.props.modalIsOpen
		});
		return (
			<div className={containerClasses} key={this.props.name}>
				<Animation transitionName={this.props.transitionName} className="modal-animation-wrapper" transitionAppear={true} transitionAppearTimeout={250} transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250}>
					{
						this.props.modalIsOpen &&
						<div className="modal">
							<div className="modal-content">
								<div className="panel">
									{
										this.props.showClose &&
										<span className="fa fa-close" onClick={this.props.handleClose}></span>
									}
									{
										this.props.showTitle &&
										<div className="panel-title primary">
											{this.props.title}
										</div>
									}
									<div className="panel-content">
										{this.props.children}
									</div>
									{
										this.props.showFooter &&
										<div className="panel-footer text-right">
											{
												this.props.showCancel &&
												<button type="button collapse" className="button close-modal" onClick={this.props.handleClose}>{this.props.cancelText || 'Cancel'}</button>
											}
											{
												this.props.handleSubmit &&
												<button type="button collapse" className="button confirm-modal" onClick={this.props.handleSubmit}>{this.props.confirmText || 'Submit'}</button>
											}
										</div>
									}
								</div>
							</div>
						</div>
					}
				</Animation>
				<div className={backdropClasses} onClick={this.props.handleClose}></div>
			</div>
	    );
    }
}

Modal.propTypes = {
	'cancelText': PropTypes.string,
	'confirmText': PropTypes.string,
	'handleClose': PropTypes.func.isRequired,
	'handleSubmit': PropTypes.func,
	'modalIsOpen': PropTypes.bool.isRequired,
	'name': PropTypes.string.isRequired,
	'showCancel': PropTypes.bool,
	'showClose': PropTypes.bool,
	'showFooter': PropTypes.bool,
	'showTitle': PropTypes.bool,
	'title': PropTypes.string,
	'transitionName': PropTypes.string
}

Modal.defaultProps = {
	'showCancel': true,
	'showClose': false,
	'showFooter': true,
	'showTitle': true,
	'transitionName': 'fade'
}
