const API_ENDPOINT = "https://v1.appbackend.io/v1/rows/dYHhjWAUBtDY";

let bookData = [];
const mainContainer = document.getElementById("mainContainer");
const searchInput = document.getElementById("searchInput");
const formInput = document.getElementById("formInput");

async function getData() {
  const pending = await fetch(API_ENDPOINT);
  const result = await pending.json();
  return result;
}

async function buildApp() {
  const { data: data } = await getData();
  bookData = data;

  bookData.forEach((book) => {
    const container = document.createElement("div");
    const title = document.createElement("h1");
    const cover = document.createElement("img");
    const rating = document.createElement("h1");
    const review = document.createElement("a");

    container.classList.add(
      "border",
      "border-black",
      "m-6",
      "shadow-2xl",
      "flex",
      "flex-col",
      "items-center"
    );
    cover.classList.add("w-32", "h-48", "mt-3");
    title.classList.add("text-md", "font-medium", "py-2");
    review.classList.add(
      "bg-blue-500",
      "px-2",
      "rounded",
      "my-2",
      "border",
      "border-slate-200",
      "border-2",
      "text-medium",
      "text-white",
      "hover:scale-110",
      "hover:transition-all",
      "hover:duration-200"
    );

    title.textContent = book.title;
    cover.src = book.cover;
    rating.textContent = `Rating : ${book.rating}`;
    review.textContent = "Review !";
    review.href = `/item.html?id=${book._id}`;

    container.append(cover, title, rating, review);
    mainContainer.append(container);
  });
}

buildApp();

searchInput.addEventListener("keyup", () => {
  const inputValue = searchInput.value;
  mainContainer.innerHTML = "";

  const filter = bookData.filter((book) =>
    book.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  filter.forEach((book) => {
    const container = document.createElement("div");
    const title = document.createElement("h1");
    const cover = document.createElement("img");
    const rating = document.createElement("h1");
    const review = document.createElement("a");

    container.classList.add(
      "border",
      "border-black",
      "m-6",
      "shadow-2xl",
      "flex",
      "flex-col",
      "items-center"
    );
    cover.classList.add("w-32", "h-48", "mt-3");
    title.classList.add("text-md", "font-medium", "py-2");
    review.classList.add(
      "bg-blue-500",
      "px-2",
      "rounded",
      "my-2",
      "border",
      "border-slate-200",
      "border-2",
      "text-medium",
      "text-white",
      "hover:scale-110",
      "hover:transition-all",
      "hover:duration-200"
    );

    title.textContent = book.title;
    cover.src = book.cover;
    rating.textContent = `Rating : ${book.rating}`;
    review.textContent = "Review !";
    review.href = `/item.html?id=${book._id}`;

    container.append(cover, title, rating, review);
    mainContainer.append(container);
  });
});

formInput.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = new FormData(event.target);
  const title = form.get("title");
  const sinopsis = form.get("sinopsis");
  const author = form.get("author");
  const year = form.get("year");
  const rating = form.get("rating");
  const category = form.get("category");
  const cover = form.get("cover");

  await creatData(title, sinopsis, author, year, rating, category, cover);
  location.reload()
});

async function creatData(
  title,
  sinopsis,
  author,
  year,
  rating,
  category,
  cover
) {
  const pending = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        title,
        sinopsis,
        author,
        year,
        rating,
        category,
        cover,
      },
    ]),
  });
  const result = await pending.json();
  return result;
}


const menuBar = document.getElementById("menuBar");
const btnBurger = document.getElementById("btnBurger");

btnBurger.addEventListener("click", () => {
  menuBar.classList.toggle("hidden");
});