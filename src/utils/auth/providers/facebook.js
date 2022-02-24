import { auth } from '../../lib/firebase'
// import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { signInWithRedirect, getRedirectResult, FacebookAuthProvider  } from "firebase/auth";
const provider = new FacebookAuthProvider();

async function signWithFacebook () {
    try {
        await signInWithRedirect(auth, provider);

    } catch (error) {
       
    }
    

}


// facebook sign in with pop up //

// async function signWithFacebook () {

//     try {
//        const response = await signInWithPopup(auth, provider)
//        const credential = await FacebookAuthProvider.credentialFromResult(response)

//        const accessToken = credential.accessToken;
//         console.log(response)
//        return response
//     } catch (error) {

//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.email;
//         // The AuthCredential type that was used.
//         const credential = FacebookAuthProvider.credentialFromError(error);
//         console.log(error)
//         return error
//     }
// }

export { signWithFacebook }