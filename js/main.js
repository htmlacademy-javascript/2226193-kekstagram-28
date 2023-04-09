import {renderGallery} from './gallery.js';
import {getFilteredPictures, init} from './filters.js';
import {getData, sendData} from './api.js';
import {closeEditImageModal, setOnUploadFormSubmit} from './edit-image-form.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {showAlert, debounce} from './util.js';

setOnUploadFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeEditImageModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  init(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}
