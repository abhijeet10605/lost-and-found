function toggleMode() {
  document.body.classList.toggle("dark-mode");
}


const data = [
  { title: "Music Fest", image: "https://cdn.pixabay.com/photo/2015/11/03/09/09/magnifying-glass-1020142_640.jpg", location: "Mumbai" },
  { title: "Art Expo", image: "https://cdn.pixabay.com/photo/2015/11/03/09/09/magnifying-glass-1020142_640.jpg", location: "Delhi" },
  { title: "Food Fair", image: "https://cdn.pixabay.com/photo/2015/11/03/09/09/magnifying-glass-1020142_640.jpg", location: "Pune" }
];

function displayCards(array) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = ""; // Clear existing cards

  array.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${item.image}" class="card-img-top" alt="${item.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.location}</p>
          <a href="#" class="btn btn-primary mt-auto">View More</a>
        </div>
      </div>
    `;

    cardContainer.appendChild(col);
  });
}

displayCards(data);
