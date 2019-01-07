import React, { Component } from 'react';
import PageTop from '../../utils/PageTop';

import { frets, price } from '../../utils/Form/fixed_categories';

import { connect } from 'react-redux';
import { getProductsToShop , getBrands, getWoods } from '../../actions/product';

import CollapseCheckbox from '../../utils/CollapseCheckbox';
import CollapseRadio from '../../utils/CollapseRadio';

import LoadMoreCards from './LoadMoreCards';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';
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

        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ));
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

        this.appyFilter(newFilters);

        this.setState({
            filters: newFilters
        })
    }

    appyFilter = (filters) => {
        this.props.dispatch(getProductsToShop(0, this.state.limit, filters))
            .then(() => {
            // set back the skip to 0 after we apply the new filters
            this.setState({
                skip: 0
            })
        });
    }

    loadMoreCards = () => {
        const skip = this.state.skip + this.state.limit;

        this.props.dispatch(getProductsToShop(skip, this.state.linit, this.state.filters, this.props.products.toShop))
            .then(() => {
                this.setState({
                    skip
                })
            })
    }

    handleGrid = () => {
        this.setState({
            grid: !this.state.grid ? 'grid_bars' : ''
        })
    }

    render() {
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
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div
                                        className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faTh} />
                                    </div>
                                    <div
                                        className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faBars} />
                                    </div>
                                </div>

                                <div>
                                    <LoadMoreCards 
                                        grid={this.state.grid}
                                        limit={this.state.limit}
                                        size={products.toShopSize}
                                        products={products.toShop}
                                        loadMore={() => this.loadMoreCards()}
                                    />
                                </div>
                            </div>
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

