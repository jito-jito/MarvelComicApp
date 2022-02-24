import { auth } from '../lib/firebase'
import { getAuth, signOut } from "firebase/auth";

// const auth = getAuth();

async function logOut() {

    try {
        const logOut = await signOut(auth)
        console.log(logOut)
        return logOut
    } catch (error) {
        console.log(error)
        return error
    }

} 

export { logOut }
