const container = document.querySelector('.container');
const input = document.querySelector('input');

fetch(
  'https://api.unsplash.com/photos/?client_id=JKPLOCX2f0TBKu_pGGULx_ALX6QjwfsPt6vX_U_VWwI'
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      container.innerHTML += `<div><img src="${element.urls.full}" 
			alt="${element.alt_description}">
	</div>`;
    });
  });

input.addEventListener('keydown', function ({ key }) {
  if (key === 'Enter') {
    console.log(input.value);
  }
});
