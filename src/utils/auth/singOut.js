import { auth } from '../lib/firebase'
import { signOut } from "firebase/auth";


async function logOut() {

    try {
        const logOut = await signOut(auth)
        return logOut
    } catch (error) {
        return error
    }

} 

export { logOut }
