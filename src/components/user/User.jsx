import React from 'react';
import { UserConfig } from './UserConfig.jsx';
import { UserContext } from '../../UserContext';


function User( {userName, userPhoto, logOut} ) {

    function renderComponent(userData, loadingUserData) {

        
        if( !loadingUserData && !userData ) {
            return(
                <>
                    {/* <h1>
                        <Link to="/">sign in</Link> to see this page
                    </h1> */}
                </>
            )
            
        }
        if( loadingUserData && !userData ) {
            return <h1>loading Data....</h1> 
        }
        if( !loadingUserData && userData ) {
            console.log(userData.photoURL)
            return (
                <div className='user'>
                    <div className='user-container'>
                        <figure className='user-photo'>
                            <img src={userData.photoURL} alt='userPhoto'/>
                        </figure>
                        <p className='user-name'>{userData.displayName}</p>
                    </div>
                    <UserConfig logOut={logOut} />
                
                </div>
            )
        }
    }


    return(
        <>
            <UserContext.Consumer>
                {({userData, loadingUserData}) => renderComponent(userData, loadingUserData)
                }
            </UserContext.Consumer>
        </>
    )
}

export { User }