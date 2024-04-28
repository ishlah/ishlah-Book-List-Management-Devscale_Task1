const url = window.location.search;
const params = new URLSearchParams(url);
const bookId = params.get("id");

const API_ENDPOINT = `https://v1.appbackend.io/v1/rows/dYHhjWAUBtDY/${bookId}`;

const title = document.getElementById("title");
const author = document.getElementById("author");
const year = document.getElementById("year");
const rating = document.getElementById("rating");
const category = document.getElementById("category");
const sinopsis = document.getElementById("sinopsis");
const formInput = document.getElementById("formInput");
const cover = document.getElementById("cover")

async function getData() {
  const pending = await fetch(API_ENDPOINT);
  const result = await pending.json();
  return result;
}

async function buildApp() {
  const book = await getData();

  title.value = book.title;
  author.value = book.author;
  year.value = book.year;
  rating.value = book.rating;
  category.value = book.category;
  sinopsis.value = book.sinopsis;
  cover.value = book.cover
}
buildApp();

formInput.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch("https://v1.appbackend.io/v1/rows/dYHhjWAUBtDY", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: bookId,
      title: title.value,
      sinopsis: sinopsis.value,
      author: author.value,
      year: year.value,
      rating: rating.value,
      category: category.value,
      cover: cover.value
    }),
  });
  location.replace(`/item.html?id=${bookId}`);
});
