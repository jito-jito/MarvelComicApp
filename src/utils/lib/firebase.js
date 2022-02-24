import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";

/// test app

// const firebaseConfig = {
//     apiKey: "AIzaSyALZQtPUE0mjQcUR3CtxI5hUBpiQO6I8Us",
//     authDomain: "testapp-636d6.firebaseapp.com",
//     projectId: "testapp-636d6",
//     storageBucket: "testapp-636d6.appspot.com",
//     messagingSenderId: "274723334922",
//     appId: "1:274723334922:web:af16ff322743e2c1cd28f3"
// };

// marvel app

const firebaseConfig = {
    apiKey: "AIzaSyCcje4og_uGgUQ4yNptemXtcgNTcttwm78",
    authDomain: "marvelcomicapp-6a573.firebaseapp.com",
    projectId: "marvelcomicapp-6a573",
    storageBucket: "marvelcomicapp-6a573.appspot.com",
    messagingSenderId: "48702315857",
    appId: "1:48702315857:web:b422082ac60fad84ff0770"
};
  

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();


export { auth, onAuthStateChanged, db }


