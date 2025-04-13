// Import Firebase modules
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { firestore, auth, } from './firebase-config.js';

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
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log("✅ User created:", user.uid);

            // Save additional user details in Firebase Realtime Database
            await addDoc(collection(firestore, "LostAndFound", "app", "users"), {
                email,
                password,
                username,
                contact,
                collegeID,
                createdAt: serverTimestamp(),
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
