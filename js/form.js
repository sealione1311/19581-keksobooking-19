'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomSelect = adForm.querySelector('#room_number');
  var guestSelect = adForm.querySelector('#capacity');
  var roomsError = window.data.createElement('span', '.ad-form__element--rooms', 'rooms_error');
  var textOneRoom = 'Можно выбрать 1 гостя';
  var textTwoRooms = 'Можно выбрать 1 или 2 гостя';
  var textThreeRooms = 'Можно выбрать 1, 2 или 3 гостей';
  var textHundredRooms= 'Выбирете вариант "не для гостей"';

  var matchRoomsAndGuests = function () {
    var roomNumber = parseInt(roomSelect.value, 10);
    var capacity = parseInt(guestSelect.value, 10);
    switch (true) {
    case (roomNumber === 1 && capacity !== 1):
      roomSelect.setCustomValidity(textOneRoom);
      roomsError.textContent = textOneRoom;
      break;
    case ((roomNumber === 2 && capacity === 3) || (roomNumber === 2 && capacity === 0)):
      roomSelect.setCustomValidity(textTwoRooms);
      roomsError.textContent = textTwoRooms;
      break;
    case (roomNumber === 3 && capacity === 0):
      roomSelect.setCustomValidity(textThreeRooms);
      roomsError.textContent = textThreeRooms;
      break;
    case (roomNumber === 100 && capacity !== 0):
      roomSelect.setCustomValidity(textHundredRooms);
      roomsError.textContent = textHundredRooms;
      break;
    default:
      roomSelect.setCustomValidity('');
      roomsError.textContent = '';
    } roomsError.setAttribute('style', 'color: red');
  };
  roomSelect.addEventListener('change', matchRoomsAndGuests);
  guestSelect.addEventListener('change', matchRoomsAndGuests);

  window.form = {
    matchRoomsAndGuests: matchRoomsAndGuests
  };
})();
