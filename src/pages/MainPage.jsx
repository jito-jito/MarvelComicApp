import React, { useContext, useState } from 'react';
import { Layout } from '../containers/Layout';
import { Search } from '../containers/Search.jsx';
import { ResultsContainer } from '../containers/ResultsContainer';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

import { getUser } from '../utils/lib/getUser';
import { updateUserComics } from '../utils/lib/updateUserComics';


function MainPage() {
    const { userData, loadingUserData, userSavedComics, setUserSavedComics } = useContext(UserContext)
    // const { userSavedComics } = useContext(UserContext)
    const [ charactersData, setCharactersData ] = useState('')
    const [ comicsData, setComicsData ] = useState('')
    
    async function searchCharacters( options, searchValue) {

        let limitOfResults = options.find((option) => option.checked === true)

        try {
            const fetchCharacters = await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchValue}&limit=${limitOfResults.value}&apikey=${'9cc3527121e6c8ccdd2aa38a39d5d38f'}`)
            const results = await fetchCharacters.json()
            if (results.code != 200) {
                throw 'error in get data'
            }
            console.log(results.data.results)
            setCharactersData( results.data.results )



        } catch (error) {
            console.log(error)
        }
    }

    async function searchComics(e, characterId) {
        try {
            const fetchComics = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${'9cc3527121e6c8ccdd2aa38a39d5d38f'}`)
            const results = await fetchComics.json()
            if (results.code != 200) {
                throw 'error in get data'
            }
            console.log(results.data.results)
            setComicsData( { id: characterId, data: results.data.results } )



        } catch (error) {
            console.log(error)
        }
    }

    async function saveComic(e, comicId) {
       
        // console.log(userData.uid)
        const userDbId = await getUser(userData)
        const selectedComicData = comicsData.data.find((comic) => comic.id == comicId)
        const saveComic = await updateUserComics(userDbId, selectedComicData)
        console.log(selectedComicData, saveComic)
        let newComics = userSavedComics

        if(saveComic.status == 'added') {
            newComics = [...newComics,  saveComic.data]
            // await setUserSavedComics(prevState => [...prevState, saveComic.data])
        } 
        if(saveComic.status == 'deleted'){
            newComics = userSavedComics.filter((comic) => comic.comicId != selectedComicData.id)
            // console.log(newSavedComics)
            // await setUserSavedComics(newSavedComics)
        }
  

        // console.log(e.target.previousSibling)
        console.log(newComics)
        let isFavorite = newComics.some((comic) => comic.comicId == selectedComicData.id)
        console.log(isFavorite)
        // console.log(isFavorite, selectedComicData, userSavedComics)
        e.target.previousSibling.checked = isFavorite
        setUserSavedComics(newComics)
     

        
    }


    return (
        <>
            <Layout>
                { !loadingUserData && !userData ?
                    <>
                        <h1>
                            <Link to="/">sign in</Link> to see this page
                        </h1>
                    </> : ''
                }
                { loadingUserData && !userData ?
                    <>
                        <h1>loading Data....</h1>
                    </> : ''
                }
                { !loadingUserData && userData ?
                    <>
                        <div className='main-page'>
                            <h1>Search characters!</h1>
                            <Search searchCharacters={searchCharacters}/>
                            <ResultsContainer 
                                charactersData={charactersData} 
                                searchComics={searchComics} 
                                comicsData={comicsData}                                 
                                saveComic={saveComic}
                            />
                        </div> 
                    </> : ''
                }
            </Layout>
        </>
    )
}


export { MainPage }