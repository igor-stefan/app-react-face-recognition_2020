import React from 'react'

const Rank = ({name,entries}) => {
    return(
        <div className='center' style={{alignItems:'center'}}>
            <div className='white f3'>
                {`${name}, your current rank is `}
            </div>
            <div className='white f1 b ml2'>
                {`#${entries}`}
            </div>
        </div>
    )

}
export default Rank;