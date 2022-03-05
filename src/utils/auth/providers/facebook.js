import { auth } from '../../lib/firebase'
import { signInWithRedirect, FacebookAuthProvider  } from "firebase/auth";
const provider = new FacebookAuthProvider();

async function signWithFacebook () {
    try {
        await signInWithRedirect(auth, provider);

    } catch (error) {
       
    }
    

}


export { signWithFacebook }