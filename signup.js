// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAmHl4IBoveBjGKtmDEsdwpQCRd8p382qo",
    authDomain: "recent-7ee4a.firebaseapp.com",
    databaseURL: "https://recent-7ee4a-default-rtdb.firebaseio.com",
    projectId: "recent-7ee4a",
    storageBucket: "recent-7ee4a.appspot.com",
    messagingSenderId: "441628321240",
    appId: "1:441628321240:web:19ca42a6428a3d3f60fead",
    measurementId: "G-SDLZPK3WRP"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Signup Form Submission
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    let username = document.getElementById("username").value;
    let contact = document.getElementById("contact").value;
    let collegeID = document.getElementById("collegeID").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !contact || !collegeID || !email || !password || !confirmPassword) {
        document.getElementById("message").innerText = "⚠️ All fields are required!";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("message").innerText = "⚠️ Passwords do not match!";
        return;
    }

    // Create user in Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("✅ User created:", user.uid);

            // Save additional user details in Firebase Realtime Database
            return set(ref(database, "users/" + user.uid), {
                username: username,
                contact: contact,
                collegeID: collegeID,
                email: email,
                uid: user.uid
            });
        })
        .then(() => {
            document.getElementById("message").innerText = "✅ Signup successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "login.html"; // Redirect after successful signup
            }, 2000);
        })
        .catch((error) => {
            console.error("❌ Firebase Error:", error);
            document.getElementById("message").innerText = error.message;
        });
});
