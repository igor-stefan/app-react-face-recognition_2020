import React from 'react'
import FacesCards from '../FacesCards/FacesCards.js'

const FaceRecognition = ({boxesOutlineFace, imageUrl}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageUrl} width='500rem' height='auto'/>
                <div> {
                    boxesOutlineFace.map((points,index) => {
                        return(
                         <FacesCards points={points} key={index}/>
                        )
                    })
                }
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;