import React, {useContext, useState} from 'react';
import { Layout } from '../containers/Layout';
import { ComicFavorite } from '../containers/ComicFavorite';
import { FormButton } from '../components/buttons/FormButton';
import { UserContext } from '../UserContext'
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../utils/lib/getUser'
import { updateUserComics } from '../utils/lib/updateUserComics'


function MainProfilePage() {
    const { userData, loadingUserData, userSavedComics, setUserSavedComics } = useContext(UserContext)

    async function deleteComic(e, comicId) {
    
        const userDbId = await getUser(userData)
        let selectedComicData = userSavedComics.find((comic) => comic.comicId == comicId)
        selectedComicData.id = selectedComicData.comicId
        const deleteComic = await updateUserComics(userDbId, selectedComicData)
        let newComics = userSavedComics.filter((comic) => comic.comicId != selectedComicData.comicId)

        setUserSavedComics(newComics)
    }

    let navigate = useNavigate()
    return(
        <>
            <Layout>
                {  !loadingUserData && !userData ?  
                    <>
                        <h1><Link to="/">sign in</Link> to see this page</h1>
                    </> : '' 
                }
                { loadingUserData && !userData || !userSavedComics ? 
                    <>
                        <h1>loading Data....</h1>
                    </> : '' 
                }
                { !userSavedComics ? 
                    <>
                        <h1>loading Data....</h1>
                    </> : '' 
                }
                { !loadingUserData && userData && userSavedComics != undefined ?
                    <>
                        <main className='mainProfile-page'>
                            <h1>Hello {userData.displayName}</h1>
                            <h1>Your favorite comics:</h1>
                            <section className='favoriteComics-container'>
                                {userSavedComics.map(comic => (
                                    <ComicFavorite
                                        key={comic.comicId}
                                        comicId={comic.comicId}
                                        img={`${comic.images[0].path}.${comic.images[0].extension}`}
                                        title={comic.title}
                                        deleteComic={deleteComic}
                                    />
                                ))}
                                                            
                            </section>
                            <FormButton className={'defaultButton mainProfile'} value='search more comics' onClick={() => navigate("/search", { replace: true })} />
                        </main>
                    </> : ''
                    
                   
                }

                {/* { !loadingUserData && userData && userSavedComics.length == 0 ?
                    <>
                        <main className='mainProfile-page'>
                            <h1>Hello {userData.displayName}</h1>
                            <p>go to the main page to search comics</p>                      
                            <FormButton className={'defaultButton mainProfile'} value='search more comics' onClick={() => navigate("/search", { replace: true })} />
                        </main>
                
                    </> : ''
                } */}
             
                    
                
            </Layout>
        </>
    )
}


export { MainProfilePage }