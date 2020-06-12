import React from 'react'
import Tilt from 'react-tilt'
import image from './image.png'
import './logo.css'

const Logo = () => {
    return(
        <div className='ml3 mb1 mt1'>
            <Tilt className="Tilt br2 shadow-3" options={{ max : 65 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa2"><img style={{paddingTop: '1px' }} alt='logo' src={image}/> </div>
            </Tilt>
        </div>
    )

}
export default Logo;