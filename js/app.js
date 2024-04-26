let select = document.querySelector(".select");
const API_URL = "https://dummyjson.com";
let searchInput = document.querySelector(".search__input");
let seeMoreBtn = document.querySelector(".see__more__btn");
let searchBtn = document.querySelector(".search__btn");
const LIMIT_COUNT = 4;
let count = 1;
let wrapper = document.querySelector(".wrapper");

// Funksiyalar
async function fetchData(api) {
  try {
    const data = await fetch(`${api}/products?limit=${LIMIT_COUNT * count}`);
    const res = await data.json();
    createCard(res);
  } catch (error) {
    console.log(error);
  } finally {
    seeMoreBtn.innerHTML = "See more";
    seeMoreBtn.removeAttribute("disabled");
  }
}

async function fetchCategories(api) {
  try {
    const data = await fetch(`${api}/products/categories`);
    const res = await data.json();
    createOptions(res);
  } catch (error) {
    console.log(error);
  }
}

function createOptions(data) {
  let options = '<option value="all">All</option>';
  data.forEach((category) => {
    options += `<option value="${category}">${category}</option>`;
  });
  select.innerHTML = options;
  select.append(`<option value="all">All</option>`);
}

async function fetchProducts(api, option, searchValue) {
  let url = "";
  if (option === "all") {
    url = searchValue
      ? `${api}/products/search/?q=${searchValue}`
      : `${api}/products`;
  } else {
    url = `${api}/products/category/${option}`;
  }
  try {
    const data = await fetch(url);
    const res = await data.json();
    createCard(res);
  } catch (error) {
    console.log(error);
  }
}

function createCard(data) {
  let cards = "";
  data.products.forEach((product) => {
    cards += `
      <div class="card">
        <img class="card__img" data-id="${product.id}" src="${product.images[0]}" alt="">
        <div class="card__desc">
          <div class="rating">
            <h3>${product.rating}</h3> <img class="star" src="/images/star.svg" alt="">
          </div>
          <h3>${product.title}</h3>
          <p>${product.price} ₽</p>
          <button data-id="${product.id}" class="card__btn">Ko'proq ma'lumotlar</button>
        </div>
      </div>
    `;
  });
  wrapper.innerHTML = cards;
}

select.addEventListener("change", (e) => {
  const optionValue = e.target.value;
  console.log(optionValue);
  fetchProducts(API_URL, optionValue);
});

searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.trim();
  if (searchValue) {
    fetchProducts(API_URL, "all", searchValue);
    select.value = "all";
  }
});

searchBtn.addEventListener("click", () => {
  const searchValue = searchInput.value.trim();
  if (searchValue) {
    fetchProducts(API_URL, "all", searchValue);
    select.value = "all";
  }
});

seeMoreBtn.addEventListener("click", () => {
  count++;
  fetchData(API_URL);
  seeMoreBtn.innerHTML = "Loading...";
  seeMoreBtn.setAttribute("disabled", true);
});

fetchCategories(API_URL);
fetchProducts(API_URL, "all");

wrapper.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("card__img") ||
    e.target.classList.contains("card__btn")
  ) {
    const id = e.target.dataset.id;
    window.open(`/pages/products.html?id=${id}`, "_self");
  }
});

let password = document.querySelector(".input__password");
let eye = document.querySelector(".eye");
let eyeSlash = document.querySelector(".eye-slash");

eye.addEventListener("click", () => {
  password.setAttribute("type", "text");
  eyeSlash.style.display = "block";
  eye.style.display = "none";
});

eyeSlash.addEventListener("click", () => {
  password.setAttribute("type", "password");
  eye.style.display = "block";
  eyeSlash.style.display = "none";
});
