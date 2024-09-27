const input = document.querySelector('input');
const inputIcon = document.querySelector('.search-icon');
const loading = document.querySelector('.loading');
const loadingImage = document.querySelector('.loading img');
const container = document.querySelector('.container');

let closeIcon = false;

window.addEventListener('load', () => {
  input.focus();
  getData();
});

async function getData() {
  try {
    const res = await fetch(
      'https://api.unsplash.com/photos/random?client_id=JKPLOCX2f0TBKu_pGGULx_ALX6QjwfsPt6vX_U_VWwI&count=30'
    );
    const data = await res.json();
    console.log(data);

    data.forEach((element) => {
      container.innerHTML += `<div class='results'><img src="${element.urls.small}" 
		alt="${element.alt_description}" id=${element.id}>
</div>`;
    });
    document.addEventListener('DOMContentLoaded ', function () {
      container.style.display = 'block';
      loading.style.display = 'none';
    });
  } catch {
    container.style.display = 'block';
    loadingImage.style.display = 'none';
    loading.textContent = 'Попробуйте еще раз!';
  }
}
//getData();

function completeInput(event) {
  event.preventDefault();
  closeIcon = true;
  inputIcon.classList.add('close');
  getDataWithQuery(input.value);
}

function clearInput() {
  input.value = '';
  inputIcon.classList.remove('close');
}

input.addEventListener('keydown', function (event) {
  if (event.which === 13 || event.keyCode === 13 || event.key === 'Enter') {
    completeInput(event);
    closeIcon &&
      inputIcon.addEventListener('click', () => {
        clearInput();
      });
  }
});

inputIcon.addEventListener('click', function (event) {
  completeInput(event);

  closeIcon &&
    inputIcon.addEventListener('click', () => {
      clearInput();
    });
});

async function getDataWithQuery(query) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?client_id=JKPLOCX2f0TBKu_pGGULx_ALX6QjwfsPt6vX_U_VWwI&query=${query}&per_page=30`
    );
    const data = await res.json();
    // console.log(data.results);
    container.innerHTML = '';
    data.results.forEach((element) => {
      container.innerHTML += `<div class='results'><img src="${element.urls.small}" 
	alt="${element.alt_description}">
</div>`;
    });
  } catch {
    container.style.display = 'block';
    loadingImage.style.display = 'none';
    loading.textContent = 'Попробуйте еще раз!';
  }
}

input.addEventListener('input', function (event) {
  if (input.value.length == 0) inputIcon.classList.remove('close');
});
