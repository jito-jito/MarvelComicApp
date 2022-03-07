import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function UserConfig({ logOut }) {
    const location = useLocation();

    return(
        <>
            <div className='user-config'>
                { location.pathname === '/search' ? 
                    <p className='user-config-password'><Link to="/profile">profile</Link></p> : ''
                }
                {/* <p className='user-config-password'><a href="">change password</a></p> */}
                <p className='user-config-logout'><Link to="/" href="" onClick={logOut}>sign out</Link></p>
            </div>
        </>
    )
}

export { UserConfig }