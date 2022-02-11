import React from 'react';
import { UserConfig } from './UserConfig.jsx';

function User( {userName, userPhoto} ) {

    return(
        <>
            <div className='user'>
                <div className='user-container'>
                    <figure className='user-photo'>
                        <img alt='userPhoto'/>
                    </figure>
                    <p className='user-name'>User name</p>
                </div>
                <UserConfig />
                
            </div>
        </>
    )
}

export { User }