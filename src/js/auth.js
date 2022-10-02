import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
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
export const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth();
const authBtn = document.querySelector('.auth')
const authGoogleBtn = document.querySelector('.authgoogle')
const userLibrary = document.querySelector('.library')
const authMenu = document.querySelector('.auth-div')
const authEmailBtn = document.getElementById('authlogin')
const signUpEmailBtn = document.getElementById('authsignup')
const emailInput = document.getElementById('authEmail')
const passwordInput = document.getElementById('authPassword')

authEmailBtn.addEventListener('click', onEmailAuth)
authBtn.addEventListener('click', onAuthClick)
authGoogleBtn.addEventListener('click', onGoogleAuth)

signUpEmailBtn.addEventListener('click', onSignUp)
const authGoogle = async () => {
  await signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user
    if(user) {
        Notiflix.Notify.success(`Hello ${user.displayName}`)
        authBtn.removeEventListener('click', onAuthClick)
        
    }

  
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });}

 authEmailAndPassword = async () => {
    const loginEmail = emailInput.value
    const loginPassword = passwordInput.value
    try{
      const userCredential = await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
      
      Notiflix.Notify.success(`Hello ${userCredential.user.email}`)
      passwordInput.classList.remove('error')
      emailInput.classList.remove('error')
      
    } 
    catch(error) {
      console.log(error.code)
      if(error.code === AuthErrorCodes.INVALID_PASSWORD)
      {Notiflix.Notify.failure('Wrong password, try again!')
      passwordInput.classList.add('error')}
      passwordInput.value = ""
      
      if(error.code === AuthErrorCodes.INVALID_EMAIL)
      {Notiflix.Notify.failure('Wrong email, try again!')
        emailInput.classList.add('error')}
    }
    
  }

export default onAuthStateChanged(auth,  (user) => {
  
  if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      authBtn.innerHTML = "LOG OUT"
      authBtn.removeEventListener('click', onGoogleAuth)
      authBtn.addEventListener('click', userSignOut)
      authMenu.classList.remove('auth-clicked')
      passwordInput.classList.remove('error')
      emailInput.value = ''
      passwordInput.value = ''
      revealUserUI ()
      // if(renderMovieDetails) {
        
      //   const userbtns = document.querySelectorAll('.button-modal')
      //   console.log(userbtns)
      //   userbtns.forEach(item => item.classList.remove('auth-hidden'))
      // }
      
    } 
    else if (   document.location.pathname === '/my-library.html') {
     
        window.location.replace(document.location.origin)
       
        
    }
        else {
          // if(renderMovieDetails) {
            
          //   userbtns.forEach(item => item.classList.add('auth-hidden'))
          // }
        authMenu.classList.remove('auth-clicked')
        authBtn.addEventListener('click', onAuthClick)
        authBtn.innerHTML = "LOG IN"
      
        hideUserUI ()
    }
  });

async function onEmailAuth(e) {
    e.preventDefault()
    if (emailInput.value === '' || passwordInput.value === '') {
      Notiflix.Notify.warning('Please fill the form')
      return
    }
   await authEmailAndPassword()
    
  }

function onAuthClick () {
    authMenu.classList.toggle('auth-clicked')
    
  }
const createAccount = async () => {
    const loginEmail = emailInput.value
    const loginPassword = passwordInput.value
    try{
      const userCredential = await createUserWithEmailAndPassword(auth,loginEmail,loginPassword)
      console.log(userCredential.user)
      Notiflix.Notify.success(`Hello ${userCredential.user.displayName}`)
    } 
    catch(error) {
      console.log(error.code)
      if(error.code === AuthErrorCodes.EMAIL_EXISTS)
      {Notiflix.Notify.failure('This email is already taken!')}
      
     
    }
  }
  async function onSignUp(e) {
  e.preventDefault()
  if (emailInput.value === '' || passwordInput.value === '') {
    Notiflix.Notify.warning('Please fill the form')
    
    return
  }
  await  createAccount()
  
}  
 function onGoogleAuth(e) {
  e.preventDefault()
  authGoogle()
    
  }

  

function userSignOut () {

signOut(auth).then(() => {
        Notiflix.Notify.info('You have successfully signed out!', )    
        // Sign-out successful.
        authBtn.removeEventListener('click', userSignOut)
        
  }).catch((error) => {
    // An error happened.
  });}
 


function hideUserUI () {

  
  userLibrary.classList.add('auth-hidden')
}
function revealUserUI () {
 
  userLibrary.classList.remove('auth-hidden')
}


