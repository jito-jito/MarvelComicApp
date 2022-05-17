import { auth } from '../lib/firebase'
import { getAuth, updateProfile } from 'firebase/auth'

async function updateUserData (name) {
  try {
    const updateData = await updateProfile(auth.currentUser, {
      displayName: name
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    })
  } catch (error) {
    console.log(error)
  }
}

export { updateUserData }
