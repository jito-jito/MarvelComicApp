import React, { useContext } from 'react';
import { CheckboxInput } from '../components/inputs/CheckboxInput';
import { FormButton } from '../components/buttons/FormButton';
import { UserContext } from '../UserContext'


function ComicsResult({ comicsData, characterId, saveComic }) {
    const { userSavedComics } = useContext(UserContext)
    function goToMarvelPage(url) {
        window.open(url, "_blank");
    }


    
    return (
        <>
            { comicsData && characterId == comicsData.id ?
                <div className='results-container-comics'>
                        <h3>List of comics by character</h3>
                        <FormButton className='defaultButton comicRandomAdd'
                    value='add three random comics'/>
                </div> : ''
            }
           
            { comicsData && characterId == comicsData.id ?
               comicsData.data.map((comic) => {
                let isInFavorites = userSavedComics.some((savedComic) => savedComic.comicId == comic.id)
        
                return (
                    
                    <section className='comics-result' key={comic.id}>
            
                        <CheckboxInput 
                            checkboxType="favorite" 
                            id={comic.id}
                            onClick={saveComic}
                            checked={isInFavorites}
                        />
                        <figure className='comics-result-img'>
                            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="" />
                        </figure>
                        <article className='comics-result-description'>
                            <section className='comics-result-descriptionTitle'>
                                <h4>Title:</h4>
                                <p>{comic.title}</p>
                            </section>
                            <section className='comics-result-descriptionDetails'>
                                <h4>Description:</h4>
                                <p>{comic.description}</p>
                            </section>
                        
                            <FormButton 
                                className='defaultButton comicResult'
                                value='see in marvel'
                                onClick={() => goToMarvelPage(comic.urls[0].url)}
                            />
                        </article>
                    </section>

                    
                )
            })
                : ''
            }
        
            
        </>
    )
}


export { ComicsResult }








// comicsData.data.map((comic) => (
                   
//     <section className='comics-result'>
//         <CheckboxInput 
//             checkboxType="favorite" 
//             id={comic.id}
//             onClick={saveComic}
//         />
//         <figure className='comics-result-img'>
//             <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="" />
//         </figure>
//         <article className='comics-result-description'>
//             <section className='comics-result-descriptionTitle'>
//                 <h4>Title:</h4>
//                 <p>{comic.title}</p>
//             </section>
//             <section className='comics-result-descriptionDetails'>
//                 <h4>Description:</h4>
//                 <p>{comic.description}</p>
//             </section>
        
//             <FormButton 
//                 className='defaultButton comicResult'
//                 value='see in marvel'
//                 onClick={() => goToMarvelPage(comic.urls[0].url)}
//             />
//         </article>
//     </section>
// ))