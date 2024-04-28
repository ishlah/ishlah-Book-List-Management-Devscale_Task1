const url = window.location.search;
const params = new URLSearchParams(url);
const bookId = params.get("id");

const API_ENDPOINT = `https://v1.appbackend.io/v1/rows/dYHhjWAUBtDY/${bookId}`;

const bookContainer = document.getElementById("bookContainer");

async function getItem() {
  const pending = await fetch(API_ENDPOINT);
  const result = await pending.json();
  console.log(result);

  const container = document.createElement("div");
  const textContainer = document.createElement("div");
  const title = document.createElement("p");
  const cover = document.createElement("img");
  const author = document.createElement("p");
  const textAuthor = document.createElement("p");
  const year = document.createElement("p");
  const textYear = document.createElement("p");
  const category = document.createElement("p");
  const textCategory = document.createElement("p");
  const rating = document.createElement("p");
  const textRating = document.createElement("p");
  const sinopsis = document.createElement("p");
  const sinopsisText = document.createElement("p");
  const btnEdit = document.createElement("a");
  const btnDelete = document.createElement("a");
  const btnContainer = document.createElement("div");
  const btnHome = document.createElement('a')
  const mainContainer = document.createElement('div')

  textContainer.classList.add("max-sm:m-auto", "max-sm:w-[600px]");
  container.classList.add(
    "flex",
    "justify-center",
    "gap-12",
    "items-center",
    "max-sm:flex-col",
  );
  cover.classList.add(
    "w-72",
    "h-96",
    "max-sm:w-24",
    "max-sm:h-96",
    "max-sm:w-[600px]",
    "max-sm:m-auto"
  );
  title.classList.add(
    "text-2xl",
    "font-bold",
    "text-center",
    "pb-8",
    "max-sm:m-auto",
    "max-sm:pt-3"
  );
  sinopsis.classList.add("text-justify", "pb-4", "max-sm:w-[600px]");
  sinopsisText.classList.add("font-bold", "pt-4", "w-[680px]");
  btnEdit.classList.add(
    "bg-rose-500",
    "px-8",
    "text-white",
    "py-1",
    "rounded",
    "font-bold",
    "border-2",
    "border-slate-300"
  );
  btnDelete.classList.add(
    "bg-rose-500",
    "px-8",
    "text-white",
    "py-1",
    "rounded",
    "font-bold",
    "border-2",
    "border-slate-300"
  );
  btnContainer.classList.add("flex", "justify-between", "pt-8", "mb-4");
  btnHome.classList.add(
    "bg-blue-500",
    "px-8",
    "text-white",
    "py-1",
    "rounded",
    "font-bold",
    "border-2",
    "border-slate-300"
  );
  textAuthor.classList.add("font-medium")
  textYear.classList.add("font-medium", "mt-3")
  textCategory.classList.add("font-medium", "mt-3");
  textRating.classList.add("font-medium", "mt-3");
  // mainContainer.classList.add("max-sm:flex", "max-sm:flex-col")
  btnContainer.classList.add("max-sm:w-[600px]", "max-sm:m-auto");
  

  title.textContent = result.title;
  cover.src = result.cover;
  author.textContent = result.author;
  textAuthor.textContent = "Penulis :"
  year.textContent = result.year;
  textYear.textContent = "Tahun :"
  category.textContent = result.category;
  textCategory.textContent = "Kategori :"
  rating.textContent = result.rating;
  textRating.textContent = "Rating :"
  sinopsis.textContent = result.sinopsis;
  sinopsisText.textContent = "Sinopsis : ";
  btnEdit.href = `/update.html?id=${result._id}`;
  btnEdit.textContent = "Edit";
  btnDelete.href = btnDelete.textContent = "Delete";
  btnHome.href= `/index.html`
  btnHome.textContent= "Home"

  textContainer.append(
    
    textAuthor,
    author,
    textYear,
    year,
    textRating,
    rating,
    textCategory,
    category,
    sinopsisText,
    sinopsis,
  );

  btnContainer.append(btnEdit, btnHome, btnDelete);
  container.append(cover, textContainer);
  mainContainer.append(title, container, btnContainer);
  bookContainer.append(mainContainer);

  btnDelete.addEventListener("click", async (event) => {
    if (window.confirm("Anda yankin menghapus ini?") == true){
    event.preventDefault(); 

    await deletData(result._id);
    location.reload();
    location.replace(`index.html`);}else{
      event.preventDefault();
    }
  });
}

getItem();

async function deletData(id) {
  const pending = await fetch("https://v1.appbackend.io/v1/rows/dYHhjWAUBtDY", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([id]),
  });
  const result = await pending.json();
  return result;
}
