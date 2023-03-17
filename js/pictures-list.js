import {generatePhotos} from './data.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const generatedPictures = generatePhotos();

const picturesListFragment = document.createDocumentFragment();

generatedPictures.forEach(({url, likes, comments}) => {
  const picturesListItem = pictureTemplate.cloneNode(true);
  picturesListItem.querySelector('.picture__img').src = url;
  picturesListItem.querySelector('.picture__likes').textContent = likes;
  picturesListItem.querySelector('.picture__comments').textContent = comments.length;
  picturesListFragment.appendChild(picturesListItem);
});

picturesList.appendChild(picturesListFragment);
