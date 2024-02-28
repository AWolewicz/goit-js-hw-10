import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

loader.classList.add('hidden');

try {
  fetchBreeds().then(data => renderSelect(data));
  loader.classList.remove('hidden');
} catch (error) {
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
};


function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
  loader.classList.add('hidden');
};

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  const oldCat = document.getElementById('cat-div');
  if (typeof(oldCat) != undefined && oldCat != null) {
    oldCat.remove()
  };
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div id="cat-div">
        <h1>${name}</h1>
        <img src="${url}" alt="${name}" class="img"/>
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
    </div>`
  );
  loader.classList.add('hidden');
};

breedSelect.addEventListener('change', e => {
  loader.classList.remove('hidden');
  fetchCatByBreed(e.target.value)
    .then(data => renderCat(data[0]))
    .catch(error => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'));
});
