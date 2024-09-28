const input = document.querySelector("input");
const inputIcon = document.querySelector(".search-icon");
const loading = document.querySelector(".loading");
const loadingImage = document.querySelector(".loading img");
const container = document.querySelector(".container");

let closeIcon = false;
let loadedCount, errorCount, imageCount;

window.addEventListener("load", () => {
  input.focus();
  getData();
});

async function getData() {
  try {
    const res = await fetch(
      "https://api.unsplash.com/photos/random?client_id=JKPLOCX2f0TBKu_pGGULx_ALX6QjwfsPt6vX_U_VWwI&count=30"
    );
    const data = await res.json();
    loadedCount = errorCount = 0;
    imageCount = data.length;
    completeContainer(data);

    const resultsImages = document.querySelectorAll(".results img");

    resultsImages.forEach((resultsImage) =>
      resultsImage.addEventListener("click", openModal)
    );
  } catch (err) {
    container.innerHTML = "";
    container.style.display = "block";
    loadingImage.style.display = "none";
    loading.textContent = "Попробуйте еще раз!";
    console.log(err);
  }
}

async function getDataWithQuery(query) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?client_id=JKPLOCX2f0TBKu_pGGULx_ALX6QjwfsPt6vX_U_VWwI&query=${query}&per_page=30`
    );
    const data = await res.json();

    loadedCount = errorCount = 0;
    imageCount = data.results.length;
    if (imageCount === 0) {
      container.innerHTML = "";
      container.style.display = "block";
      loadingImage.style.display = "none";
      loading.textContent =
        "Увы, согласно указанным параметрам картинки не найдены!";
    } else {
      completeContainer(data.results);
      const resultsImages = document.querySelectorAll(".results img");

      resultsImages.forEach((resultsImage) =>
        resultsImage.addEventListener("click", openModal)
      );
      console.log(data.results);
    }
  } catch (err) {
    container.innerHTML = "";
    container.style.display = "block";
    loadingImage.style.display = "none";
    loading.textContent = "Попробуйте еще раз!";
    console.log(err);
  }
}

input.addEventListener("keydown", function (event) {
  if (event.which === 13 || event.keyCode === 13 || event.key === "Enter") {
    completeInput(event);
    closeIcon &&
      inputIcon.addEventListener("click", () => {
        clearInput();
      });
  }
});

inputIcon.addEventListener("click", function (event) {
  event.preventDefault();
  completeInput(event);

  closeIcon &&
    inputIcon.addEventListener("click", (event) => {
      event.preventDefault();

      clearInput();
    });
});

function completeInput(event) {
  event.preventDefault();
  closeIcon = true;
  inputIcon.classList.add("close");
  getDataWithQuery(input.value);
  container.style.display = "none";
  loading.style.display = "flex";
}

function clearInput() {
  input.value = "";
  inputIcon.classList.remove("close");
}

function completeContainer(data) {
  container.innerHTML = "";
  data.forEach((element) => {
    createElement(element);
  });
}

function createElement(element) {
  const results = document.createElement("div");
  results.classList.add("results");
  const image = document.createElement("img");
  image.onload = onload;
  image.onerror = onerror;
  image.src = element.urls.regular;
  image.alt = element.alt_description;
  results.append(image);
  container.append(results);
}

input.addEventListener("input", function (event) {
  if (input.value.length == 0) inputIcon.classList.remove("close");
});

/*Сheck images loading*/

const checkAllLoaded = function () {
  if (loadedCount + errorCount == imageCount) {
    container.style.display = "block";
    loading.style.display = "none";
  }
};
const onload = function () {
  loadedCount++;
  checkAllLoaded();
};
const onerror = function () {
  errorCount++;
  checkAllLoaded();
};

/*Modal Windows*/
const modal = document.querySelector(".modal-overlay");

function openModal(event) {
  if (event.target.tagName === "IMG") {
    document.body.style.overflow = "hidden";
    modal.classList.remove("hide");
    modal.innerHTML = "";
    const image = document.createElement("img");
    image.src = event.target.currentSrc;
    modal.append(image);

    modal.addEventListener("click", closeModal);
  }
}

function closeModal(e) {
  if (e.target.classList.contains("modal-overlay")) {
    modal.classList.add("hide");
    document.body.style.overflow = "";
  }
}
