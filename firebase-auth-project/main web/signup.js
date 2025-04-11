// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Firebase configuration (from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyBc7KuSXBUcV9q-NUEwFoaGPOeDEAF7CT0",
    authDomain: "lost-and-found-portal-8e18a.firebaseapp.com",
    projectId: "lost-and-found-portal-8e18a",
    storageBucket: "lost-and-found-portal-8e18a.firebasestorage.app",
    messagingSenderId: "78111865825",
    appId: "1:78111865825:web:963e6e5e6a108fcb3830a0",
    measurementId: "G-36TW9HKKTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up Function
function signUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            document.getElementById("message").innerText = "Signed up successfully!";
        })
        .catch(error => {
            document.getElementById("message").innerText = error.message;
        });
}

// Login Function
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            document.getElementById("message").innerText = "Logged in successfully!";
        })
        .catch(error => {
            document.getElementById("message").innerText = error.message;
        });
}

// Logout Function
function signOutUser() {
    signOut(auth)
        .then(() => {
            document.getElementById("message").innerText = "Logged out successfully!";
        })
        .catch(error => {
            document.getElementById("message").innerText = error.message;
        });
}

// Attach functions to buttons (for testing)
document.getElementById("signUpBtn").addEventListener("click", signUp);
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("logoutBtn").addEventListener("click", signOutUser);


// Sign-up function
function signUp() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("User registered successfully!");
        })
        .catch((error) => {
            console.error("Error signing up:", error.message);
        });
}

// Login function
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("User logged in!");
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
        });
}
