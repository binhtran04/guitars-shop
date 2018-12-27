import React from 'react';
import Button from '../../utils/Button';

const HomePromotion = (props) => {

    const promotion = {
        img: '/images/featured/featured_home_3.jpg',
        lineOne: 'Up to 40%',
        lineTwo: 'In second hand guitars',
        linkTitle: 'Shop now',
        linkTo: '/shop'
    }

    const renderPromotion = () => (
        promotion ?
            <div className="home_promotion_img"
                style={{
                    background: `url(${promotion.img})`,
                    height: `${window.innerHeight}px`
                }}
            >
                <div className="tag title">{promotion.lineOne}</div>
                <div className="tag low_title">{promotion.lineTwo}</div>
                <Button
                    type="default"
                    title={promotion.linkTitle}
                    linkTo={promotion.linkTo}
                    addStyles={{
                        margin: '10px 0 0 0'
                    }}
                />
            </div>
            : null
    )

    return (
        <div className="home_promotion">
            {renderPromotion()}
        </div>
    );
};

export default HomePromotion;