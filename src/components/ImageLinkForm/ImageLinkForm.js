import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit, valueField }) => {
    return(
        <div>
            <p className='f3 b'>
                {'This magic green brain will detect faces in your pictures! Try it :)'}
            </p>
            <div className='center form pa4 br3 shadow-4'>
                <input 
                    className = 'f4 pa2 br2 w-70 center'
                    type='text'
                    placeholder='https://www.myimage.com' 
                    onChange={onInputChange}
                    value={valueField}     
                    />
                <button
                    className = 'w-30 grow br2 f4 link pv2 dib white b bg-light-purple'
                    onClick={onButtonSubmit}    
                    >
                    Detect
                </button> 
            </div>
        </div>
    )
}

export default ImageLinkForm;