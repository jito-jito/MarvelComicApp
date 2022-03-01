import React, { useContext } from 'react';
import { UserConfig } from '../components/user/UserConfig.jsx';
import { UserContext } from '../UserContext';
import userDefaultIcon from '../assets/images/userDefaultIcon.png'
import Skeleton from 'react-loading-skeleton'


function User( {userName, userPhoto, logOut} ) {
    const { userData, loadingUserData } = useContext(UserContext)

    return(
        <>
    
            { loadingUserData && !userData ?
                <div className='loading-user'>
                    <Skeleton width='100%' height='100%'/>
                </div> : ''
            }
            { !loadingUserData && userData ?
                <div className='user'>
                    <div className='user-container'>
                        <figure className='user-photo'>
                            <img src={userData.photoURL ? userData.photoURL : userDefaultIcon} alt=''/>
                        </figure>
                        <p className='user-name'>{userData.displayName}</p>
                    </div>
                    <UserConfig logOut={logOut} />
                
                </div> : ''
            }

        </>
    )
    
}

export { User }