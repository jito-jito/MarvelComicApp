import { 
    GoogleAuthProvider, 
    signInWithRedirect
} from "firebase/auth";
import { auth } from '../../lib/firebase'

const provider = new GoogleAuthProvider();


async function signWithGoogle() {
    try {
        await signInWithRedirect(auth, provider);
    } catch (error) {
        throw error
    }
}



export { signWithGoogle }