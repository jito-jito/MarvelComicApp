import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

async function loginUser (email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
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
