// Check if script is running
console.log("login.js loaded");

// Firebase Config
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login Function
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please enter both email and password.");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = "report.html"; // Redirect to lost item page
    })
    .catch((error) => {
      alert(error.message);
      console.error("Login error:", error);
    });
});
