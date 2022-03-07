import React, {useContext, useState} from 'react';
import { Layout } from '../containers/Layout';
import { ComicFavorite } from '../containers/ComicFavorite';
import { FormButton } from '../components/buttons/FormButton';
import { UserContext } from '../UserContext'
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../utils/lib/getUser'
import { updateUserComics } from '../utils/lib/updateUserComics'
import { SignOutPage } from './SignOutPage'
import { ModalComicFavorite } from '../containers/ModalComicFavorite'

import Skeleton from 'react-loading-skeleton'

function MainProfilePage() {
    const { userData, loadingUserData, userSavedComics, setUserSavedComics } = useContext(UserContext)
    const [ openModal, setOpenModal ] = useState({
        state: false,
        id: null
    })
    let navigate = useNavigate()


    function goToMarvelPage(url) {
        window.open(url, "_blank");
    }

    function toggleModal(e, value) {
        e.stopPropagation()
        setOpenModal(value)
    }

    async function deleteComic(e, comicId) {
        e.stopPropagation()
        const userDbId = await getUser(userData)
        let selectedComicData = userSavedComics.find((comic) => comic.comicId == comicId)
        selectedComicData.id = selectedComicData.comicId
        const deleteComic = await updateUserComics(userDbId, selectedComicData)
        let newComics = userSavedComics.filter((comic) => comic.comicId != selectedComicData.comicId)

        setUserSavedComics(newComics)
    }

    const signOutState = () => { return ( !loadingUserData && !userData ?    
        <>
            <SignOutPage/>
        </>  
     : '')
    }
    const loadingPageState = () => { return ( loadingUserData && (!userData || userData)  ? 
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
    )}
    const successUserLoadedState = () => userSavedComics.length > 0 && userData
    const userWithoutComicsState = () => { return (!loadingUserData && userSavedComics.length == 0 && userData ? 
        <main className='mainProfile-page'>
            <section className='mainProfile-page-withoutData'>
                <h1>Hello {userData.displayName}</h1>
                <p>go to the main page to search comics</p>                      
                <FormButton className={'defaultButton mainProfile'} value='search comics' onClick={() => navigate("/search", { replace: true })} />
            </section> 
        </main>
        : ''  
    )}

    return(
        <>
            <Layout>
                { signOutState() }
                { loadingPageState() }
                { userWithoutComicsState() }
                { successUserLoadedState() ?
                    <>
                        <main className='mainProfile-page'>
                                    <h1 className='mainProfile-userTitle'>Hello {userData.displayName}</h1>
                                    <h1 className='mainProfile-title'>Your favorite comics:</h1>
                                    <section className='favoriteComics-container'>
                                        {userSavedComics.map(comic => (
                                            <>
                                                <ComicFavorite
                                                    key={comic.comicId}
                                                    comicId={comic.comicId}
                                                    img={ comic.images[0] ? `${comic.images[0].path}.${comic.images[0].extension}` : `${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                                    title={comic.title}
                                                    deleteComic={deleteComic}
                                                    toggleModal={toggleModal}
                                                    
                                                    
                                                />

                                             

                                                <ModalComicFavorite
                                                    openModal={openModal}
                                                    modalId={comic.comicId}
                                                    title={comic.title}
                                                    description={comic.description}
                                                    img={ comic.images[0] ? `${comic.images[0].path}.${comic.images[0].extension}` : `${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                                    urls={comic.urls}
                                                    toggleModal={toggleModal}
                                                    goToMarvelPage={goToMarvelPage}
                                                /> 

                                            </>
                                            
                                        ))}
                                                                    
                                    </section>
                                    <FormButton 
                                        className={'defaultButton mainProfile'} 
                                        value='search more comics' 
                                        onClick={() => navigate("/search", { replace: true })} 
                                    />
                        </main> 
                    </> : ''
                    
                }
            </Layout>
        </>
    )
}


export { MainProfilePage }