import React, {useContext} from 'react';
import { Layout } from '../containers/Layout';
import { ComicFavorite } from '../components/ComicFavorite';
import { FormButton } from '../components/buttons/FormButton';
import { UserContext } from '../UserContext'
import { Link, useNavigate } from 'react-router-dom';



function MainProfilePage() {
    const { userData, loadingUserData, userSavedComics } = useContext(UserContext)
    let navigate = useNavigate()

    return(
        <>
            <Layout>
                {  !loadingUserData && !userData ?  
                    <>
                        <h1><Link to="/">sign in</Link> to see this page</h1>
                    </> : '' 
                }
                { loadingUserData && !userData ? 
                    <>
                        <h1>loading Data....</h1>
                    </> : '' 
                }
                { !loadingUserData && userData && userSavedComics.length > 0?
                    <>
                        <main className='mainProfile-page'>
                            <h1>Hello {userData.displayName}</h1>
                            <h1>Your favorite comics:</h1>
                            <section className='favoriteComics-container'>
                                {userSavedComics.map(comic => (
                                    <ComicFavorite
                                        img={`${comic.images[0].path}.${comic.images[0].extension}`}
                                        title={comic.title}
                                    
                                    />
                                ))}
                                                            
                            </section>
                            <FormButton className={'defaultButton mainProfile'} value='search more comics' onClick={() => navigate("/search", { replace: true })} />
                        </main>
                    </> : ''
                    
                   
                }

                { !loadingUserData && userData && userSavedComics.length == 0 ?
                    <>
                        <main className='mainProfile-page'>
                            <h1>Hello {userData.displayName}</h1>
                            <p>go to the main page to search comics</p>                      
                            <FormButton className={'defaultButton mainProfile'} value='search more comics' onClick={() => navigate("/search", { replace: true })} />
                        </main>
                
                    </> : ''
                }
             
                    
                
            </Layout>
        </>
    )
}


export { MainProfilePage }