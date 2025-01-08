let currentPage = 1;
let itemsPerPage = window.innerWidth <= 500 ? 3 : 5;
let fetchedData = [];
let filteredData = [];

const searchSection = document.querySelector(".search-section");
const searchBox = document.getElementById("search-box");
const searchIcon = document.querySelector(".search-icon");

// Function to update the number of items per page
const updateItemsPerPage = () => {
  itemsPerPage = window.innerWidth <= 500 ? 3 : 5;
  displayPage(currentPage);
};

window.addEventListener("resize", updateItemsPerPage);

// Function to display the current page
const displayPage = (page) => {
  const dataListContainer = document.getElementById("dataList");
  dataListContainer.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = filteredData.slice(start, end);

  pageData.forEach((item) => {
    const dataItemHTML = `
      <div class="data-item">
        <img src="${item.image}" alt="${item.name}" width="100" height="100" />
        <div>
          <h3>${item.name}</h3>
          <p>Price: $${item.price}</p>
          <p>Category: ${item.category}</p>
        </div>
      </div>
    `;
    dataListContainer.innerHTML += dataItemHTML;
  });

  document.getElementById("pageInfo").textContent = `${page}`;
};

// Fetch data from the API
fetch("https://672c3f511600dda5a9f7accc.mockapi.io/category")
  .then((response) => response.json())
  .then((data) => {
    fetchedData = data;
    filteredData = data;
    displayPage(currentPage);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function Previous Page
document.getElementById("prevPageBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
});
// Function Next Page
document.getElementById("nextPageBtn").addEventListener("click", () => {
  if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
    currentPage++;
    displayPage(currentPage);
  }
});

// Function filter data
document.getElementById("filterOptions").addEventListener("change", (event) => {
  const selectedCategory = event.target.value;
  filteredData =
    selectedCategory === "all"
      ? fetchedData
      : fetchedData.filter((item) => item.category === selectedCategory);
  currentPage = 1;
  displayPage(currentPage);
});
// Function sort data
document.getElementById("sortOptions").addEventListener("change", (event) => {
  const sortValue = event.target.value;

  if (sortValue === "name-asc") {
    filteredData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "name-desc") {
    filteredData.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortValue === "price-asc") {
    filteredData.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    filteredData.sort((a, b) => b.price - a.price);
  }

  currentPage = 1;
  displayPage(currentPage);
});
//  Function search data
searchBox.addEventListener("input", (event) => {
  const searchQuery = event.target.value.toLowerCase();
  filteredData = fetchedData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
  );
  currentPage = 1;
  displayPage(currentPage);
});

// Function click icon search
searchIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  searchSection.classList.toggle("show");
  if (searchSection.classList.contains("show")) {
    searchBox.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!searchSection.contains(event.target)) {
    searchSection.classList.remove("show");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    searchSection.classList.remove("show");
  }
});
