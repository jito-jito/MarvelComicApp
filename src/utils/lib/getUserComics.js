import { doc, updateDoc, getDocs, getDoc, query, where, collection, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from './firebase';

async function getUserComics(userId) {    
    let data = []

    const userComicsRef = collection(db, `users/${userId}/comics`)
    const userComicsQuerySnapshot = await getDocs(userComicsRef);
    // console.log(userComicsQuerySnapshot)
    
    if(userComicsQuerySnapshot.empty) {
        data = []
    } else {
        userComicsQuerySnapshot.forEach(comic => {
            data.push(comic.data())
            
        });
    }

    return data
}


export { getUserComics }