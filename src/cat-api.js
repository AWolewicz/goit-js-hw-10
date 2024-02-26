// import axios from "axios";
// import Notiflix from "notiflix";

// export const fetchBreeds = () => {
//   axios.defaults.headers.common['x-api-key'] =
//     'live_MwEb6cOBTopHRDyNUjHlWQNDyUgwDVtKpr05DwKMod1smb0DX1YoCVVEOAt89H8u';

//   return axios.get(`https://api.thecatapi.com/v1/breeds`)
//     .then(res => res.data)
//     .catch(e => {
//       Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
//     });
// };

// export const fetchCatByBreed = breedId => {
//   return axios
//     .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
//     .then(res => res.data)
//     .catch(e => {
//       Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
//     });
// };
