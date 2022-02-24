import { getDocs, query, where, collection, addDoc } from "firebase/firestore";
import { db } from './firebase';


async function getUser(userData) {
    const { uid: userId } = userData
    try {
        const usersRef = collection(db, "users")
        const userQuery = query(usersRef, where("userId", "==", userId));
        const userQuerySnapshot = await getDocs(userQuery);
        let docId;
        
        if(userQuerySnapshot.empty) {
            const newDocId = await addDoc(usersRef, {
                userId: userId,
                name: userData.displayName,
                email: userData.email ? userData.email : 'no register',
                photo: userData.photoURL
                
            }, userId)
            await userQuerySnapshot.forEach(docs => { 
                docId = docs.id
            })

            return docId
        } else {
            await userQuerySnapshot.forEach(docs => { 
                docId = docs.id
            })

            return docId
        }
    } catch(error) {
        console.log(error)
    }
}

export { getUser }