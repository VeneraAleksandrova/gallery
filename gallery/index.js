const container = document.querySelector('.container');
const input = document.querySelector('input');
const inputIcon = document.querySelector('.search-icon');

let closeIcon = false;
async function getData() {
  try {
    const res = await fetch(
      'https://api.unsplash.com/photos/random?client_id=JKPLOCX2f0TBKu_pGGULx_ALX6QjwfsPt6vX_U_VWwI&count=30'
    );
    const data = await res.json();
    //console.log(data);
    data.forEach((element) => {
      container.innerHTML += `<div class='results'><img src="${element.urls.small} " 
		alt="${element.alt_description}" >
</div>`;
    });
  } catch {
    //console.log(error);
  }
}
getData();

input.addEventListener('keydown', function (event) {
  if (event.which === 13 || event.keyCode === 13 || event.key === 'Enter') {
    event.preventDefault();
    closeIcon = true;
    //console.log(input.value);
    inputIcon.classList.add('close');
    getDataWithQuery(input.value);

    closeIcon &&
      inputIcon.addEventListener('click', () => {
        input.value = '';
        inputIcon.classList.remove('close');
      });
  }
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
    //console.log(error);
  }
}

input.addEventListener('input', function (event) {
  if (input.value.length == 0) inputIcon.classList.remove('close');
});
