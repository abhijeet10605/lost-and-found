// Import Firebase modules
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { firestore, auth } from './firebase-config.js';

// Make sure the CometChat SDK is loaded in your HTML
// <script src="https://unpkg.com/@cometchat/chat-sdk-javascript/CometChat.js"></script>

// Signup Form Submission
document.getElementById("signupForm").addEventListener("submit", async function (event) {
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

    try {
        // First initialize CometChat
        await initChat();

        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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

        // Register the user in CometChatconst email = "example@gmail.com";
        const UID = email.split("@")[0];
        console.log(username); // Output: example

        await registerUserForChat(UID, UID);

        document.getElementById("message").innerText = "✅ Signup successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "login.html"; // Redirect after successful signup
        }, 2000);
    } catch (error) {
        console.error("❌ Error:", error);
        document.getElementById("message").innerText = error.message;
    }
});

// Initialize CometChat
async function initChat() {
    return new Promise((resolve, reject) => {
        if (typeof CometChat === 'undefined') {
            reject(new Error("CometChat SDK not loaded. Make sure to include the script tag."));
            return;
        }

        let appID = "273329924d9c4a2b";
        let region = "in";
        let appSetting = new CometChat.AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion(region)
            .autoEstablishSocketConnection(true)
            .build();

        CometChat.init(appID, appSetting).then(
            () => {
                console.log("CometChat initialization completed successfully");
                resolve();
            },
            (error) => {
                console.log("CometChat initialization failed with error:", error);
                reject(error);
            }
        );
    });
}

// Register user in CometChat
async function registerUserForChat(email, username) {
    return new Promise((resolve, reject) => {
        const authKey = "4768e4bc22a09b8c619dd82be1cf3a04b95cfcd7";
        const UID = email;
        const name = username || email.split('@')[0]; // Use username if available, otherwise use part of email

        const user = new CometChat.User(UID);
        user.setName(name);

        CometChat.createUser(user, authKey).then(
            (user) => {
                console.log("CometChat user created successfully:", user);
                resolve(user);
            },
            (error) => {
                console.log("Error creating CometChat user:", error);
                // Don't reject here as we want the signup to proceed even if CometChat registration fails
                // We can still create the user in Firebase
                resolve(null);
            }
        );
    });
}