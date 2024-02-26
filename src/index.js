import axios from "axios";
axios.defaults.headers.common["x-api-key"] = 'live_MwEb6cOBTopHRDyNUjHlWQNDyUgwDVtKpr05DwKMod1smb0DX1YoCVVEOAt89H8u';
import Notiflix from "notiflix";

// import { fetchBreeds, fetchCatByBreed } from './cat-api';

const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_MwEb6cOBTopHRDyNUjHlWQNDyUgwDVtKpr05DwKMod1smb0DX1YoCVVEOAt89H8u';

  return axios.get(`https://api.thecatapi.com/v1/breeds`)
    .then(res => res.data)
    .catch(e => {
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
      throw e;
    });
};

const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data)
    .catch(e => {
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
      throw e;
    });
};

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

try {
  loader.classList.remove('hidden');
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
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
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
        <h2>${name}</h2>
        <img src="${url}" alt="${name}"/>
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
    .catch(error => console.error(error));
});