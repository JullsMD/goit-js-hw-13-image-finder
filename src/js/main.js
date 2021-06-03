import apiService from './apiService';
import markupTpl from './markupTemplate';
import refs from './refs';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const API_KEY = '21895237-aa305ef77d16e82934d36c66d';

let inputValue = '';
let page = 1;

refs.loadMore.style.display = 'none';

export const getSubmitForm = e => {
  e.preventDefault();
  refs.galleryList.innerHTML = '';
  inputValue = e.target.elements.query.value.trim();
  if (inputValue.length) {
    apiService(inputValue, page, API_KEY)
      .then(images => {
        images.length
          ? (refs.loadMore.style.display = 'block')
          : (refs.loadMore.style.display = 'none');
          markupTpl(images);
          page =1;
      })
      .catch(error => console.log(error));
  }
};

export const moreImages = () => {
  page += 1;
  apiService(inputValue, page, API_KEY)
    .then(images => {
      markupTpl(images);
      refs.loadMore.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    })
    .catch(error => console.log(error));
    console.log(page);
};

export default function onOpenModal(event) {

  if (event.target.nodeName !== 'IMG') {
      return;
  }
  const instance = basicLightbox.create(`<img src="${event.target.dataset.src}" alt="" />`);
  instance.show();
}

refs.galleryList.addEventListener('click', onOpenModal);
refs.form.addEventListener('submit', getSubmitForm);
refs.loadMore.addEventListener('click', moreImages);

