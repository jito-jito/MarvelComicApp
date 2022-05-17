import { doc, getDocs, query, where, collection, addDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'

async function updateUserComics (userDbId, comicData) {
  const { id: comicId } = comicData

  try {
    //  get comic of a user
    const specificUserDoc = collection(db, `users/${userDbId}/comics`)

    // console.log(specificUserDoc)
    const comicQuery = query(specificUserDoc, where('comicId', '==', comicId))
    const comicQuerySnapshot = await getDocs(comicQuery)
    // console.log(comicQuerySnapshot)
    let comicDocId

    if (comicQuerySnapshot.empty) {
      // console.log('add comic')
      const newComicId = await addDoc(specificUserDoc, {
        comicId,
        title: comicData.title,
        description: comicData.description ? comicData.description : 'none',
        images: comicData.images ? comicData.images : 'none',
        thumbnail: comicData.thumbnail ? comicData.thumbnail : 'none',
        urls: comicData.urls ? comicData.urls : 'none'

      }, comicId)
      const newDoc = {
        comicId,
        title: comicData.title,
        description: comicData.description ? comicData.description : 'none',
        images: comicData.images ? comicData.images : 'none',
        thumbnail: comicData.thumbnail ? comicData.thumbnail : 'none',
        urls: comicData.urls ? comicData.urls : 'none'

      }
      // console.log(newDoc)
      return { status: 'added', data: newDoc }
    } else {
      await comicQuerySnapshot.forEach(docs => {
        comicDocId = docs.id
      })

      const specificComicDoc = doc(db, `users/${userDbId}/comics`, comicDocId)
      const deleteComic = await deleteDoc(specificComicDoc)
      return { status: 'deleted' }
    }
  } catch (error) {
    console.error(error)
  }
}

export { updateUserComics }
