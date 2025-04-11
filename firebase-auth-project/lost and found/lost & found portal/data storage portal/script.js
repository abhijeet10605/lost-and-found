// Firebase configuration (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
document.getElementById("submitBtn").addEventListener("click", function () {
    let itemName = document.getElementById("itemName").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let location = document.getElementById("location").value;
    let uniqueId = document.getElementById("uniqueId").value;

    // Add data to Firestore
    db.collection("lost_items").add({
        itemName: itemName,
        category: category,
        description: description,
        date: date,
        location: location,
        uniqueId: uniqueId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("Lost item reported successfully!");
        document.getElementById("itemName").value = "";
        document.getElementById("category").value = "";
        document.getElementById("description").value = "";
        document.getElementById("date").value = "";
        document.getElementById("location").value = "";
        document.getElementById("uniqueId").value = "";
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
});
// Function to fetch and display lost items
function fetchLostItems() {
    db.collection("lost_items").orderBy("timestamp", "desc").get()
        .then((querySnapshot) => {
            let itemsList = document.getElementById("itemsList");
            itemsList.innerHTML = ""; // Clear previous data

            querySnapshot.forEach((doc) => {
                let data = doc.data();
                
                // Create an HTML element to display the item
                let itemDiv = document.createElement("div");
                itemDiv.innerHTML = `
                    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                        <h3>${data.itemName}</h3>
                        <p><strong>Category:</strong> ${data.category}</p>
                        <p><strong>Description:</strong> ${data.description}</p>
                        <p><strong>Date:</strong> ${data.date}</p>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Unique ID:</strong> ${data.uniqueId}</p>
                    </div>
                `;

                itemsList.appendChild(itemDiv);
            });
        })
        .catch((error) => {
            console.error("Error fetching documents: ", error);
        });
}

// Call function when the page loads
window.onload = fetchLostItems;

function searchItems() {
    let category = document.getElementById("searchCategory").value.toLowerCase();
    let date = document.getElementById("searchDate").value;
    let location = document.getElementById("searchLocation").value.toLowerCase();

    db.collection("lost_items").orderBy("timestamp", "desc").get()
        .then((querySnapshot) => {
            let itemsList = document.getElementById("itemsList");
            itemsList.innerHTML = ""; // Clear previous results

            querySnapshot.forEach((doc) => {
                let data = doc.data();

                // Filter logic
                let matchesCategory = category === "" || data.category.toLowerCase().includes(category);
                let matchesDate = date === "" || data.date === date;
                let matchesLocation = location === "" || data.location.toLowerCase().includes(location);

                if (matchesCategory && matchesDate && matchesLocation) {
                    let itemDiv = document.createElement("div");
                    itemDiv.innerHTML = `
                        <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                            <h3>${data.itemName}</h3>
                            <p><strong>Category:</strong> ${data.category}</p>
                            <p><strong>Description:</strong> ${data.description}</p>
                            <p><strong>Date:</strong> ${data.date}</p>
                            <p><strong>Location:</strong> ${data.location}</p>
                            <p><strong>Unique ID:</strong> ${data.uniqueId}</p>
                        </div>
                    `;
                    itemsList.appendChild(itemDiv);
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching documents: ", error);
        });
}
