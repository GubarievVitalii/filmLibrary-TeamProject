import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import Notiflix from "notiflix";
Notiflix.Notify.init({
    width: '250px',
    position: 'center-top',
    distance: '60px',
    timeout: 1500,
    opacity: 0.9,
    // ...
  });
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCPHAqB2a97fVxtt1u8V2L1oprhcS8otM",
  authDomain: "filmlibrary-8e989.firebaseapp.com",
  projectId: "filmlibrary-8e989",
  storageBucket: "filmlibrary-8e989.appspot.com",
  messagingSenderId: "467332246489",
  appId: "1:467332246489:web:daf634435864e0a9e287c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const authBtn = document.querySelector('.auth')
const userLibrary = document.querySelector('.library')
const authCheck = document.querySelector('.authreq')

authBtn.addEventListener('click', onAuthClick)
userLibrary.addEventListener('click', checkAuth)
export default async function userAuth() {
  await signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      if (user) {
        Notiflix.Notify.success(`Hello ${user.displayName}`);
        authBtn.removeEventListener('click', onAuthClick);
      }
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const authListnener =  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
 
      userLibrary.innerHTML = `<a href="./my-library.html" class="nav__link library "
      >MY LIBRARY</a>`;
      authBtn.innerHTML = "LOG OUT"
      authBtn.removeEventListener('click', onAuthClick)
      authCheck.removeEventListener('click', checkAuth)
      authBtn.addEventListener('click', userSignOut)
 
    
    } 
    else if (   document.location.pathname === '/my-library.html') {
        console.log(window.location.href === document.location.origin)
        window.location.replace(document.location.origin)
       
        
    }
        else {
      
        authBtn.addEventListener('click', onAuthClick)
        authBtn.innerHTML = "LOG IN"
        userLibrary.innerHTML = `<span class="nav__link">MY LIBRARY</span>`;
        
    }
  });

 function onAuthClick () {
    userAuth()
    
  }

  

function userSignOut () {

signOut(auth).then(() => {
        Notiflix.Notify.info('You have successfully signed out!', )    
        // Sign-out successful.
        authBtn.removeEventListener('click', userSignOut)
        
  }).catch((error) => {
    // An error happened.
  });}
 
  
function checkAuth() {
         Notiflix.Notify.warning('You need to Log In!')
       }
       