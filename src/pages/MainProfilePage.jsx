import React, {useContext, useState} from 'react';
import { Layout } from '../containers/Layout';
import { ComicFavorite } from '../containers/ComicFavorite';
import { FormButton } from '../components/buttons/FormButton';
import { UserContext } from '../UserContext'
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../utils/lib/getUser'
import { updateUserComics } from '../utils/lib/updateUserComics'
import { SignOutPage } from './SignOutPage'

import Skeleton from 'react-loading-skeleton'

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

    console.log(!loadingUserData, userData == true, userSavedComics)
    let navigate = useNavigate()
    return(
        <>
            <Layout>
                { !loadingUserData && !userData ?  
                    <>
                        <SignOutPage/>
                    </> : '' 
                }
                { !loadingUserData && userData && userSavedComics == undefined ? 
                    <>
                        <div className='loading-mainProfilePage'>
                            <div className='loading-mainProfilePage-title'>
                                <div>
                                    <Skeleton width='100%' height='100%'/>
                                </div>
                                <div>
                                    <Skeleton width='100%' height='100%'/>
                                </div>
                            </div>
                            <div className='loading-mainProfilePage-comics'>
                                <div>
                                    <Skeleton width='100%' height='100%'/>
                                </div>
                                <div>
                                    <Skeleton width='100%' height='100%'/>
                                </div>
                                <div>
                                    <Skeleton width='100%' height='100%'/>
                                </div>
                                <div>
                                    <Skeleton width='100%' height='100%'/>
                                </div>                                
                            </div>
                        </div>
                    </> : '' 
                }
                { userSavedComics ?
                    <>
                        <main className='mainProfile-page'>
                            {userSavedComics.length >= 1 ?
                                <>
                                    <h1 className='mainProfile-userTitle'>Hello {userData.displayName}</h1>
                                    <h1 className='mainProfile-title'>Your favorite comics:</h1>
                                    <section className='favoriteComics-container'>
                                        {userSavedComics.map(comic => (
                                            <ComicFavorite
                                                key={comic.comicId}
                                                comicId={comic.comicId}
                                                img={ comic.images[0] ? `${comic.images[0].path}.${comic.images[0].extension}` : `${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                                title={comic.title}
                                                deleteComic={deleteComic}
                                            />
                                        ))}
                                                                    
                                    </section>
                                    <FormButton className={'defaultButton mainProfile'} value='search more comics' onClick={() => navigate("/search", { replace: true })} />
                                </>
                                :
                                <>
                                    <section className='mainProfile-page-withoutData'>
                                        <h1>Hello {userData.displayName}</h1>
                                        <p>go to the main page to search comics</p>                      
                                        <FormButton className={'defaultButton mainProfile'} value='search comics' onClick={() => navigate("/search", { replace: true })} />
                                    </section>
                                    
                                </>
                              
                            }
                            
                        </main> 
                    </> : ''
                    
                }
            </Layout>
        </>
    )
}


export { MainProfilePage }