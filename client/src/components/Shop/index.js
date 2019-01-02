import React, { Component } from 'react';
import PageTop from '../../utils/PageTop';

import { frets, price } from '../../utils/Form/fixed_categories';

import { connect } from 'react-redux';
import { getBrands, getWoods } from '../../actions/product';

import CollapseCheckbox from '../../utils/CollapseCheckbox';
import CollapseRadio from '../../utils/CollapseRadio';

class Shop extends Component {

    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    }

    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());
    }

    handlePrice = (value) => {
        const data = price;
        const foundPrice = data.find(price => price._id === parseInt(value, 10));

        return foundPrice ? foundPrice.array : [];
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters};
        newFilters[category] = filters;

        if (category === 'price') {
            let prices = this.handlePrice(filters);
            newFilters[category] = prices
        }

        this.setState({
            filters: newFilters
        })
    }

    render() {
        console.log(this.state)

        const products = this.props.products;

        return (
            <div>
                <PageTop title="Browse Products" />

                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckbox 
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={filters => this.handleFilters(filters, 'brand')}
                            />

                            <CollapseCheckbox 
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={filters => this.handleFilters(filters, 'frets')}
                            />

                            <CollapseCheckbox 
                                initState={false}
                                title="Woods"
                                list={products.woods}
                                handleFilters={filters => this.handleFilters(filters, 'wood')}
                            />  

                            <CollapseRadio
                                initState={true}
                                title="Price"
                                list={price}
                                handleFilters={filters => this.handleFilters(filters, 'price')}
                            />  


                        </div>


                        <div className="right">
                        right
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Shop);
