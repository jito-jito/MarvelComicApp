import { auth } from '../lib/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth();
async function registerUser(email, password) {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        console.log(user)
        return user
    } catch (error) {
        console.error(error)
        return error
    }


}


export { registerUser }