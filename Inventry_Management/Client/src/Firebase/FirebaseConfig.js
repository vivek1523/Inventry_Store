// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
        apiKey: "AIzaSyDYoIESsLalvu0jxWx9yj-dh8PPOwpoOyI",
        authDomain: "my-first-project-using-mern.firebaseapp.com",
        projectId: "my-first-project-using-mern",
        storageBucket: "my-first-project-using-mern.appspot.com",
        messagingSenderId: "1048476636666",
        appId: "1:1048476636666:web:0fc6e043b5d2434d290043",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
