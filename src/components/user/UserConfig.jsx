import React from 'react';

function UserConfig() {

    return(
        <>
            <div className='user-config'>
                <p className='user-config-password'><a href="">cambiar contraseña</a></p>
                <p className='user-config-logout'><a href="">cerrar session</a></p>
            </div>
        </>
    )
}

export { UserConfig }