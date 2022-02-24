import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";


  

// const auth = getAuth();

async function loginUser(email, password) {
    
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        console.log(user)
        return user
    } catch (err) {
        const error = {
            error: true,
            errorName: err.name,
            errorCode: err.code
        }
        return error
    }


}

export { loginUser }
