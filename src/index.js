// import fetchSerchValue from './fetchSerchValue';
import Notiflix from 'notiflix';
import FetchSerch from './fetchSerchValue';

const variables = {
  allForm: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  serchBtn: document.querySelector('.serch-btn'),
  moreBtn: document.querySelector('.more-btn'),
  photoCard: document.querySelector('.photo-card'),
};

const BACE_URL = 'https://pixabay.com/api/';

const FetchSerchValue = new FetchSerch();

// variables.allForm.addEventListener('submit', el => {
//   console.log(el.target.value);
// });

variables.serchBtn.addEventListener('click', serchBtn);

let serchValue = variables.input.value;

async function serchBtn(val) {
  val.preventDefault();
  variables.photoCard.innerHTML = '';
  let serchValue = variables.input.value;
  if (serchValue === '') {
    Notiflix.Notify.failure(`Введіть пошуковий запит.`);
    return;
  }
  console.log(serchValue);
  const valueBeck = await FetchSerchValue.fetchSerchValue(serchValue);
  console.log(valueBeck);
  if (valueBeck.hits.length === 0) {
    Notiflix.Notify.failure(
      `Oops, there is no country with that ${serchValue}`
    );
    return;
  }
  Notiflix.Notify.success(`Sol lucet omnibus. Result: ${valueBeck.totalHits}`);
  variables.moreBtn.classList.remove('is-hidden');
  return await renderQueryResult(valueBeck);
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
        <li class="photo-cards">
          <img class="photo-cards__img" src="${largeImageURL}" alt="${tags}" height="200px" waidth="250px"/>
          <p class="photo-cards__likes">likes: ${likes}</p>
          <p class="photo-cards__views">views: ${views}</p>
          <p class="photo-cards__comments">comments: ${comments}</p>
          <p class="photo-cards__downloads">downloads: ${downloads}</p>
        </li>
        `);
    }
  );
}

// variables.moreBtn.addEventListener('click', moreBtn);

// async function moreBtn(val) {
//   val.preventDefault();
//   const moreRes = await FetchSerchValue.fetchSerchValue(serchValue);
//   FetchSerchValue.incrementPage();
//   const moreResJson = await moreRes.json();
//   console.log(moreResJson);
// }
