//react
import React, { useContext, useState } from 'react';
import { Layout } from '../containers/Layout';
import { Search } from '../containers/Search.jsx';
import { ResultsContainer } from '../containers/ResultsContainer';
import { UserContext } from '../UserContext';
import { SignOutPage } from './SignOutPage';
import { CharacterResult } from '../containers/CharacterResult';
import { ComicsResult } from '../containers/ComicsResult';
import Skeleton from 'react-loading-skeleton'

//firebase
import { getUser } from '../utils/lib/getUser';
import { updateUserComics } from '../utils/lib/updateUserComics';

//utils
import { getData } from '../utils/getData';


function MainPage() {
    const { userData, loadingUserData, userSavedComics, setUserSavedComics } = useContext(UserContext)
    const [ charactersData, setCharactersData ] = useState('')
    const [ comicsData, setComicsData ] = useState('')
    const [ pageState, setPageState ] = useState(
        {
            error: false,
            loading: ''
        }
    )

    async function searchCharacters( options, searchValue ) {
        setPageState(prevState => ({...prevState, loading: true}))

        let limitOfResults = options.find((option) => option.checked === true)
        if (!limitOfResults) {
            limitOfResults = {
                value: 3
            } 
        }   

        try {
            const findCharacters = await getData(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchValue}&limit=${limitOfResults.value}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}`)

            if (findCharacters.code != 200) {
                throw 'error in get data'
            }
            if( findCharacters.data.count == 0 ) {
                setPageState(prevState => ({...prevState, loading: false, errorInFindCharacters: true}))
                setCharactersData([])
            }
            if( findCharacters.data.count > 0) {
                setPageState(prevState => ({...prevState, loading: false, errorInFindCharacters: false }))
                setCharactersData( findCharacters.data.results )
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    async function searchComics(e, characterId) {
        setComicsData([])
        setPageState(prevState => ({...prevState, error: false, loadingComics: true,  characterLoading: characterId, errorInFindComics: false }))

        try {
            const findComics = await getData(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${process.env.REACT_APP_MARVEL_API_KEY}`)

            if (findComics.code != 200) {
                throw 'error in get data'
            }
            
            if (findComics.data.count == 0 || findComics.data.results.length == 0 ) {
                console.log('comics not found in marvel api')
                setPageState(prevState => ({...prevState, loadingComics: false,  errorInFindComics: true, characterLoading: characterId}))
            }

            if(findComics.data.count > 0 && findComics.data.results.length > 0 ) {
                setPageState(prevState => ({...prevState, loadingComics: false, errorInFindComics: false}))
                setComicsData( { id: characterId, data: findComics.data.results } )
            }
       



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


    const signOutState = () => !loadingUserData && !userData ? <SignOutPage/> : '' 
    const loadingPageState = () => { return (loadingUserData && (!userData ||userData) ?
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
        </> : '')
    }
    const successUserLoadedState = () => !loadingUserData && userData ? true : false
    const successCharacterLoadedState = () => charactersData ? true : false
    

    return (
        <>
            <Layout>
                { signOutState() }
                { loadingPageState() }

                { successUserLoadedState() ?
                    <>
                        <div className='main-page'>
                            <h1>Search characters!</h1>
                            <Search 
                                searchCharacters={searchCharacters}
                                setPageState={setPageState}
                            />
                            <ResultsContainer
                                charactersData={charactersData}
                                pageState={pageState}
                             
                            >
                                { successCharacterLoadedState() ?
                                    charactersData.map((character) => (
                                        <CharacterResult
                                            key={character.id}
                                            id={character.id}
                                            name={character.name}
                                            img={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                            searchComics={searchComics}
                                        > 
                                            <ComicsResult 
                                                userSavedComics={userSavedComics}
                                                comicsData={comicsData} 
                                                characterId={character.id}
                                                saveComic={saveComic}
                                                pageState={pageState}
                                            />
                                        </CharacterResult>
                                    )) : ''
                                }
                            </ResultsContainer>                      
                        </div>   
                    </> : ''
                }
            </Layout>
        </>
    )
}


export { MainPage }