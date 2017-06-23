'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
import {CartActions} from '../../../library/cart';

const mapStateToProps = (state) => {
	return {
		'cartItems': state.cartItems,
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'addItem': CartActions.add,
		'removeItem': CartActions.remove
	}, dispatch);
}

class Cart extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
		}
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Cart";
    }

	getOrderTotal(items) {
		let total = 0;
		items.forEach((item) => {
			total += parseInt(item.product.price, 10) * parseInt(item.cartQty, 10);
		});
		return total;
	}

	removeItem(itemId) {
		this.props.removeItem(itemId);
	}

    render() {
        return (
            <div className="content-wrapper">
                <div className="row">
					<div className="small-12 medium-8 large-9 columns">
						<h1>Shopping Cart</h1>
						<hr />
						<table>
							<thead>
								<tr>
									<th>SKU</th>
									<th>Name</th>
									<th>Price</th>
									<th>Qty</th>
									<th>Subtotal</th>
									<th>Remove?</th>
								</tr>
							</thead>
							<tbody>
								{
									this.props.cartItems.map((item, i) =>
										<tr key={i} className="item-row">
											<td>{item.merchItem.sku}</td>
											<td>{item.merchItem.title}</td>
											<td>${item.merchItem.price}</td>
											<td>({item.cartQty})</td>
											<td>{(item.cartQty * item.merchItem.price).toFixed(2)}</td>
											<td onClick={this.removeItem.bind(this, item.id)}><span className="fa fa-minus"></span></td>
										</tr>
									)
								}
							</tbody>
						</table>
						<hr />
						<div className="small-12 columns text-right">
							Order Total: ${this.getOrderTotal.call(this, this.props.cartItems)}
						</div>
						<Link to="store/checkout" className="button">
							Go to Checkout
						</Link>
					</div>
					<div className="small-12 medium-4 large-3 columns">
						<h2>Summary</h2>
					</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
