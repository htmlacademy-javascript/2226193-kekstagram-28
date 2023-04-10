import {renderGallery} from './gallery.js';
import {setupFiltering, showFilters} from './filters.js';
import {getData} from './api.js';
import {closeEditImageModal, setUploadFormSubmit} from './edit-image-form.js';
import {showAlert} from './util.js';

getData()
  .then((pictures) => {
    renderGallery(pictures);
    showFilters();
    setupFiltering(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUploadFormSubmit(closeEditImageModal);
