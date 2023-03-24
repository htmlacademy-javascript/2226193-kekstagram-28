import {renderThumbnails} from './thumbnail.js';
import {openFullSizePhotoModal} from './photo.js';

const thumbnailsList = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  thumbnailsList.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    openFullSizePhotoModal(picture);
  });

  renderThumbnails(pictures, thumbnailsList);
};

export {renderGallery};
