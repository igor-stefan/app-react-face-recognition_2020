import React from 'react';
import './FacesCards.css';

const FacesCards = ({points}) => {
    return(
            <div
            className = 'bounding-box'
            style = {{
                            top:points.topRow, 
                            right:points.rightCol,
                            bottom:points.bottomRow,
                            left:points.leftCol
                        }}
            ></div>
            )
}
export default FacesCards;