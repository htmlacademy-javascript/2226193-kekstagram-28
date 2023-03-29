import {renderThumbnails} from './thumbnail.js';
import {openFullSizePhotoModal} from './full-size-photo.js';

const thumbnailsList = document.querySelector('.pictures');
const picturesTitle = thumbnailsList.querySelector('.pictures__title');

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

  picturesTitle.classList.remove('visually-hidden');
  renderThumbnails(pictures, thumbnailsList);
};

export {renderGallery};
