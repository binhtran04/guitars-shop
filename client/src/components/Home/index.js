import React, { Component } from 'react';
import HomeSlider from './slider';
import HomePromotion from './promotion';
import CardBlock from '../../utils/CardBlock';

import { connect } from 'react-redux';
import { getProductsByArrival, getProductsBySold } from '../../actions/product';
import { Card } from '@material-ui/core';

class Home extends Component {

    componentDidMount() {
        this.props.dispatch(getProductsBySold());
        this.props.dispatch(getProductsByArrival());
    }

    render() {
        return (
            <div>
                <HomeSlider />
                <CardBlock 
                    list={this.props.products.bySold} 
                    title="Best Selling Guitars"
                />
                <HomePromotion />
                <CardBlock 
                    list={this.props.products.byArrival} 
                    title="New Arrivals"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);