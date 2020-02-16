'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomSelect = adForm.querySelector('#room_number');
  var guestSelect = adForm.querySelector('#capacity');
  var roomsError = window.data.createElement('span', '.ad-form__element--rooms', 'rooms_error');

  var matchRoomsAndGuests = function () {
    var roomNumber = parseInt(roomSelect.value, 10);
    var capacity = parseInt(guestSelect.value, 10);
    if (roomNumber === 1 && capacity !== 1) {
      roomSelect.setCustomValidity('Можно выбрать 1 гостя');
      roomsError.textContent = 'Можно выбрать 1 гостя';
    } else if ((roomNumber === 2 && capacity === 3) || (roomNumber === 2 && capacity === 0)) {
      roomSelect.setCustomValidity('Можно выбрать 1 или 2 гостя');
      roomsError.textContent = 'Можно выбрать 1 или 2 гостя';
    } else if (roomNumber === 3 && capacity === 0) {
      roomSelect.setCustomValidity('Можно выбрать 1, 2 или 3 гостей');
      roomsError.textContent = 'Можно выбрать 1, 2 или 3 гостей';
    } else if (roomNumber === 100 && capacity !== 0) {
      roomSelect.setCustomValidity('Выбирете вариант "не для гостей"');
      roomsError.textContent = 'Выбирете вариант "не для гостей"';
    } else {
      roomSelect.setCustomValidity('');
      roomsError.textContent = '';
    } roomsError.setAttribute('style', 'color: red');
  }
  roomSelect.addEventListener('change', matchRoomsAndGuests);
  guestSelect.addEventListener('change', matchRoomsAndGuests);

  window.form = {
    matchRoomsAndGuests: matchRoomsAndGuests
  }
})();
