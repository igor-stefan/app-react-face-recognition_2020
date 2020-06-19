import React from 'react'

const Navigation = ({onRouteChange,isSignedIn}) => {  
    if(isSignedIn) {
        return(
             <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
               <p onClick={() => onRouteChange('signin')}
               className='f4 dim link black underline mt1 mb0 ml1 pr2 pt1 pb1 pointer b'>
               Sign Out
                </p>
            </nav>
        )}else {
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')}
                    className='f4 dim link black underline mt1 mb0 ml1 pr2 pt1 pb1 pointer b'>
                    Sign In
                    </p>
                    <p onClick={() => onRouteChange('register')}
                    className='f4 dim link black underline mt1 mb0 ml1 pr2 pt1 pb1 pointer b'>
                    Register
                    </p>
                </nav>
                );
                }
          }

export default Navigation;