import { auth } from '../lib/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";


async function registerUser(email, password) {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        // console.error(error)
        return error.message
    }


}


export { registerUser }