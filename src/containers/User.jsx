import React, { useContext } from 'react';
import { UserConfig } from '../components/user/UserConfig.jsx';
import { UserContext } from '../UserContext';


function User( {userName, userPhoto, logOut} ) {
    const { userData, loadingUserData } = useContext(UserContext)

    return(
        <>
              
            { !loadingUserData && !userData ?
                <>
                    {/* <h1>
                        <Link to="/">sign in</Link> to see this page
                    </h1> */}
                </> : ''
                
                
            }
            { loadingUserData && !userData ?
                <h1>loading Data....</h1> : ''
            }
            { !loadingUserData && userData ?
                <div className='user'>
                    <div className='user-container'>
                        <figure className='user-photo'>
                            <img src={userData.photoURL} alt='userPhoto'/>
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