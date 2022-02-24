// import { doc, updateDoc, getDocs, getDoc, query, where, collection, setDoc, addDoc, deleteDoc } from "firebase/firestore";
// import { db } from './firebase';

/// get a review of this code, with this code i made the actual methods to work with firebase cloud store  


async function updateUserComics(userDbId, comicData) {
    // const { uid: userId } = userData
    const userId = userDbId
    const { id: comicId } = comicData
    // console.log(comicId)
    try {
        // const usersRef = collection(db, "users")
        // const userQuery = query(usersRef, where("userId", "==", userId));
        // const userQuerySnapshot = await getDocs(userQuery);
        // let docId;
        
        // await userQuerySnapshot.forEach(docs => { 
        //     docId = docs.id
        // })


        // if(userQuerySnapshot.empty) {
        //     //create document of a user
        //     // console.log(usersRef)
        //     const newDocId = await addDoc(usersRef, {
        //         userId: userId,
        //         name: userData.displayName,
        //         email: userData.email ? userData.email : 'no register',
        //         photo: userData.photoURL
                
        //     }, userId)

        //     // console.log(newDocId)
        //     await userQuerySnapshot.forEach(docs => { 
        //         docId = docs.id
        //     })
        // } else {
        //     await userQuerySnapshot.forEach(docs => { 
        //         docId = docs.id
        //     })
        // }

        // console.log(docId)
        //  get comic of a user 
        const specificUserDoc =  collection(db, `users/${userId}/comics`)


        // console.log(specificUserDoc)
        const comicQuery = query(specificUserDoc, where("comicId", "==", comicId))
        const comicQuerySnapshot = await getDocs(comicQuery)
        console.log(comicQuerySnapshot)
        let comicDocId

        if( comicQuerySnapshot.empty ) {
            // console.log('add comic')
            const newComicId = await addDoc(specificUserDoc, {
                comicId: comicId,
                title: comicData.title,
                description: comicData.description ? comicData.description : 'none',
                images: comicData.images ? comicData.images : 'none',
                thumbnail: comicData.thumbnail ? comicData.thumbnail : 'none',
                urls: comicData.urls ? comicData.urls : 'none'
                
            }, comicId)

            // console.log(newComicId)

        } else {
            // console.log('delete')
            await comicQuerySnapshot.forEach(docs => { 
                comicDocId = docs.id
    
            })

            const specificComicDoc = doc(db, `users/${userId}/comics`, comicDocId)
            const deleteComic = await deleteDoc(specificComicDoc)
            // console.log(deleteComic)
        }
        


    } catch (error) {
        console.error(error)
    }
} 


export { updateUserComics }