import { retrieve } from './backend/retrive.js';
import { searchItems } from './backend/search.js';

// function toggleMode() {
//   document.body.classList.toggle("dark-mode");
// }

function toggleMode() {
  document.body.classList.toggle("dark-mode");

  const modeButton = document.querySelector(".mode-toggle");
  if (document.body.classList.contains("dark-mode")) {
    modeButton.textContent = "☀️";
  } else {
    modeButton.textContent = "🌙";
  }
}

// ✅ Fix: make it globally accessible
window.toggleMode = toggleMode;

let data;

const params = new URLSearchParams(window.location.search);
const email = params.get("email");

function displayCards(array) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = ""; // Clear existing cards

  cardContainer.style.display = "flex";
  cardContainer.style.flexWrap = "wrap";
  cardContainer.style.justifyContent = "space-evenly";
  cardContainer.style.gap = "20px";

  document.querySelector("#my-reports-tag").setAttribute("href", "./my-reports.html?email=" + email);

  console.log("Email:", email);

  array.forEach(item => {
    const col = document.createElement("div");
    col.style.width = "400px";
    col.style.marginBottom = "20px";

    // 🟡 Conditionally render the Claim button
    // Replace existing claimButtonHTML assignment with:
    const claimButtonHTML = item.email !== email
      ? `<a href="./chats/chats.html?currentEmail=${encodeURIComponent(email)}&reporterEmail=${encodeURIComponent(item.email)}" class="btn btn-primary mt-auto">Claim</a>`
      : `<a href="#?email=${item.email}" class="btn btn-primary mt-auto">Claimed</a>`;


    col.innerHTML = `
      <div class="card h-100">
        <div style="height: 200px; overflow: hidden; cursor: pointer;" class="image-container">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.itemName}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title" style="word-wrap: break-word;">${item.itemName}</h5>
          <p class="card-text mb-1"><strong>Location:</strong> ${item.location}</p>
          <p class="card-text mb-1"><strong>Category:</strong> ${item.category}</p>
          <p class="card-text mb-1"><strong>Description:</strong> ${item.description}</p>
          <p class="card-text mb-1"><strong>Chat id:</strong> ${item.email.split("@")[0]}</p>
          <p class="card-text mb-1"><strong>Date:</strong> ${item.date}</p>
          <p class="card-text mb-1" style="word-wrap: break-word;">
            <strong>Unique Identification:</strong> ${item.uniqueId}
          </p>
          ${claimButtonHTML}
        </div>
      </div>
    `;

    cardContainer.appendChild(col);

    const imageContainer = col.querySelector('.image-container');
    imageContainer.addEventListener('click', function () {
      displayFullImage(item.imageUrl, item.itemName);
    });
  });
}

document.querySelector("#reportLink").setAttribute("href", "./report.html?name=random&email=" + email);

document.querySelector("#chats").setAttribute("href", "./chats/chats.html?currentEmail=" + encodeURIComponent(email) + "&reporterEmail=" + encodeURIComponent("unknown@gmail.com"));


// Function to display the full image in a modal
function displayFullImage(imageUrl, imageName) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('imageModal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0,0,0,0.9)';

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '15px';
    closeBtn.style.right = '35px';
    closeBtn.style.color = '#f1f1f1';
    closeBtn.style.fontSize = '40px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.cursor = 'pointer';

    const modalImg = document.createElement('img');
    modalImg.id = 'modalImg';
    modalImg.style.margin = 'auto';
    modalImg.style.display = 'block';
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modalImg.style.position = 'absolute';
    modalImg.style.top = '50%';
    modalImg.style.left = '50%';
    modalImg.style.transform = 'translate(-50%, -50%)';

    const caption = document.createElement('div');
    caption.id = 'caption';
    caption.style.margin = 'auto';
    caption.style.display = 'block';
    caption.style.width = '80%';
    caption.style.maxWidth = '700px';
    caption.style.textAlign = 'center';
    caption.style.color = '#ccc';
    caption.style.padding = '10px 0';
    caption.style.height = '150px';
    caption.style.position = 'absolute';
    caption.style.bottom = '0';
    caption.style.left = '50%';
    caption.style.transform = 'translateX(-50%)';

    modal.appendChild(closeBtn);
    modal.appendChild(modalImg);
    modal.appendChild(caption);
    document.body.appendChild(modal);

    // Close the modal when close button is clicked
    closeBtn.onclick = function () {
      modal.style.display = 'none';
    };

    // Close the modal when clicking outside the image
    modal.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  // Display the modal with the selected image
  const modalImg = document.getElementById('modalImg');
  const caption = document.getElementById('caption');

  modal.style.display = 'block';
  modalImg.src = imageUrl;
  caption.innerHTML = imageName;
}

document.addEventListener("DOMContentLoaded", async () => {
  data = await retrieve();
  displayCards(data);

  const searchBar = document.getElementById("search-bar");
  searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim();
    const filteredData = searchItems(data, query);
    displayCards(filteredData);
  });
});
