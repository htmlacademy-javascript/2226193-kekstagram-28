import {renderGallery} from './gallery.js';
import {getData, sendData} from './api.js';
import {closeEditImageModal, setOnUploadFormSubmit} from './edit-image-form.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {showAlert} from './util.js';

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
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
