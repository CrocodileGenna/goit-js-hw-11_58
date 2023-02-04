import Notiflix from 'notiflix';
import FetchSerch from './fetchSerchValue';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  CaptionDelay: 250,
});
const FetchSerchValue = new FetchSerch();

const variables = {
  allForm: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  serchBtn: document.querySelector('.serch-btn'),
  photoCard: document.querySelector('.gallery'),
};

variables.allForm.addEventListener('submit', searchForm);

async function searchForm(val) {
  val.preventDefault();
  variables.photoCard.innerHTML += '';
  const valueInInput = val.currentTarget.elements.searchQuery.value;
  const resultSearch = await FetchSerchValue.fetchSerchValue(valueInInput);
  try {
    if (resultSearch.hits === 0) {
      Notiflix.Notify.failure(
        `Oops, there is no country with that ${valueInInput}`
      );
      return;
    } else if (valueInInput === '') {
      Notiflix.Notify.failure(`Введіть пошуковий запит.`);
      return;
    } else {
      Notiflix.Notify.success(
        `Sol lucet omnibus. Result: ${resultSearch.totalHits}`
      );
      renderQueryResult(resultSearch);
      FetchSerchValue.incrementPage();
      variables.serchBtn.textContent = 'More';
    }
    variables.input.addEventListener('input', el => {
      let values = el.target.value;
      if (valueInInput !== values) {
        variables.photoCard.innerHTML = '';
        variables.serchBtn.textContent = 'Search';
        FetchSerchValue.resetPage();
      }
    });
    lightbox.refresh();
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function renderQueryResult({ hits }) {
  hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return (variables.photoCard.innerHTML += `
        <a href="${largeImageURL}" class="gallery__link">
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>
      </a>
        `);
    }
  );
}
