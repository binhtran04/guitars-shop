import React, { Component } from 'react';
import HomeSlider from './slider';
import HomePromotion from './promotion';

class Home extends Component {
    render() {
        return (
            <div>
                <HomeSlider />
                <HomePromotion />
            </div>
        );
    }
}

export default Home;