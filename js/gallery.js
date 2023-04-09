import {renderThumbnails} from './thumbnail.js';
import {openFullSizePhotoModal} from './full-size-photo.js';

const thumbnailsList = document.querySelector('.pictures');
let pictures = [];

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }

  const picture = pictures.find(
    (item) => item.id === +thumbnail.dataset.thumbnailId
  );
  openFullSizePhotoModal(picture);
};

const renderGallery = (data) => {
  pictures = data;
  renderThumbnails(pictures, thumbnailsList);
  thumbnailsList.addEventListener('click', onThumbnailClick);
};

export {renderGallery};
