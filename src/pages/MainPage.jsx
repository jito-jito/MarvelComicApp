import React, { useContext, useState } from 'react';
import { Layout } from '../containers/Layout';
import { Search } from '../containers/Search.jsx';
import { ResultsContainer } from '../containers/ResultsContainer';
import { UserContext } from '../UserContext';
import { SignOutPage } from './SignOutPage';

import Skeleton from 'react-loading-skeleton'


import { getUser } from '../utils/lib/getUser';
import { updateUserComics } from '../utils/lib/updateUserComics';


function MainPage() {
    const { userData, loadingUserData, userSavedComics, setUserSavedComics } = useContext(UserContext)
    const [ charactersData, setCharactersData ] = useState('')
    const [ comicsData, setComicsData ] = useState('')
    const [ errors, setErrors ] = useState({
        error: false,
      
    })
    const [ loadings, setLoadings ] = useState({
        loading: '',
        loadingCharacters: false
    })
    // const [ loadingCharacters, setLoadingCharacters ] = useState( {
        
    // })
    
    async function searchCharacters( options, searchValue ) {

        setLoadings(prevState => ({...prevState, loading: true}))

        let limitOfResults = options.find((option) => option.checked === true)

        if (!limitOfResults) {
            limitOfResults = {
                value: 3
            } 
        }   

        try {
            const fetchCharacters = await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchValue}&limit=${limitOfResults.value}&apikey=${'9cc3527121e6c8ccdd2aa38a39d5d38f'}`)
            const results = await fetchCharacters.json()
            // console.log(results)
            // if (results.code == 403) {
            //     console.log('characters not founded in marvel api')
            // }
            if (results.code != 200) {
                throw 'error in get data'
            }
            if( results.data.count == 0 ) {
                setLoadings(prevState => ({...prevState, loading: false}))
                setErrors(prevState => ({ ...prevState, errorInFindCharacters: true }))
                
                
                // console.log(loadingCharacters)
            }

            setLoadings(prevState => ({...prevState, loading: false}))
            setCharactersData( results.data.results )



        } catch (error) {
            console.log(error)
        }
    }

    async function searchComics(e, characterId) {
        setErrors({ error: false })
        setLoadings(prevState => ({...prevState, loadingComics: true,  characterLoading: characterId}))
        try {
            const fetchComics = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${'9cc3527121e6c8ccdd2aa38a39d5d38f'}`)
            const results = await fetchComics.json()

            console.log(results)
      
            if (results.code != 200) {
                throw 'error in get data'
            }

            if (results.data.count == 0) {
                console.log('comocs not founded in marvel api')
                setLoadings(prevState => ({...prevState, loadingComics: false,}))
                setErrors(prevState => ({ ...prevState, errorInFindComics: true }))
            }

            setLoadings(prevState => ({...prevState, loadingComics: false}))
            setComicsData( { id: characterId, data: results.data.results } )



        } catch (error) {
            console.log(error)
        }
    }

    async function saveComic(e, comicId) {
       
        const userDbId = await getUser(userData)
        const selectedComicData = comicsData.data.find((comic) => comic.id == comicId)
        const saveComic = await updateUserComics(userDbId, selectedComicData)
        let newComics = userSavedComics

        if(saveComic.status == 'added') {
            newComics = [...newComics,  saveComic.data]
        } 
        if(saveComic.status == 'deleted'){
            newComics = userSavedComics.filter((comic) => comic.comicId != selectedComicData.id)
        }
  
        let isFavorite = newComics.some((comic) => comic.comicId == selectedComicData.id)

        e.target.previousSibling.checked = isFavorite
        setUserSavedComics(newComics)
     

        
    }


    return (
        <>
            <Layout>
                { !loadingUserData && !userData ?
                    <>
                        <SignOutPage/>
                    </> : ''
                }
                { loadingUserData && !userData ?
                    <>
                        <div className='loading-main-page'>
                            <div className='loading-search'>
                                <div>
                                    <Skeleton width='100%' height='100%'/>
                                </div>
                                <div>
                                    <Skeleton width='100%' height='100%'/>
                                </div>
                            </div>
                            <div className='loading-searchResults'>
                                <Skeleton width='100%' height='100%'/>
                            </div>
                        </div>      
                    </> : ''
                }
                { !loadingUserData && userData ?
                    <>
                        <div className='main-page'>
                            <h1>Search characters!</h1>
                            <Search 
                                searchCharacters={searchCharacters}
                                setErrors={setErrors}
                                setLoadings={setLoadings}
                            />
                            <ResultsContainer 
                                charactersData={charactersData} 
                                searchComics={searchComics} 
                                comicsData={comicsData}                                 
                                saveComic={saveComic}
                                loadings={loadings}
                                errors={errors}
                            />                      
                        </div>   
                    </> : ''
                }
            </Layout>
        </>
    )
}


export { MainPage }