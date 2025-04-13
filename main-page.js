import { retrieve } from './backend/retrive.js';
import { searchItems } from './backend/search.js';

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

let data;

function displayCards(array) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = ""; // Clear existing cards

  array.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${item.imageUrl}" class="card-img-top" alt="${item.itemName}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${item.itemName}</h5>
          <p class="card-text">${item.location}</p>
          // item.category
          // item.date
          // item.createdAt
          // <a href="./item-details.html?name=${item.itemName}&imageUrl=${item.imageUrl}" class="btn btn-primary mt-auto">Next</a>
        </div>
      </div>
    `;

    cardContainer.appendChild(col);
  });
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
