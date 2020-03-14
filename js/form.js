'use strict';

(function () {
  var minPrice = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  var adForm = document.querySelector('.ad-form');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var roomSelect = adForm.querySelector('#room_number');
  var guestSelect = adForm.querySelector('#capacity');
  var roomsError = window.data.createElement('span', '.ad-form__element--rooms', 'rooms_error');
  var typeError = window.data.createElement('span', '.ad-form__element--type', 'type_error');
  var textOneRoom = 'Можно выбрать 1 гостя';
  var textTwoRooms = 'Можно выбрать 1 или 2 гостя';
  var textThreeRooms = 'Можно выбрать 1, 2 или 3 гостей';
  var textHundredRooms = 'Выбирете вариант "не для гостей"';

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

  var matchTypeAndPrice = function () {
    var minPriceValue = parseInt(priceInput.min, 10);
    typeError.setAttribute('style', 'color: red');
    if (priceInput.value < minPriceValue) {
      typeError.textContent = 'Введите цену не менее ' + minPriceValue;
    } else {
      typeError.textContent = '';
    }
  };

  var onTypeSelectChange = function () {
    priceInput.placeholder = minPrice[typeSelect.value];
    priceInput.min = minPrice[typeSelect.value];
    matchTypeAndPrice();
  };

  var setSelectDefault = function () {
    priceInput.placeholder = minPrice[typeSelect.value];
    priceInput.min = minPrice[typeSelect.value];
    typeError.textContent = '';
    roomsError.textContent = '';
  };

  var onTimeinChange = function (evt) {
    timeOutSelect.value = evt.target.value;
  };

  var onTimeOutChange = function (evt) {
    timeInSelect.value = evt.target.value;
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.map.onLoadData, window.adverts.onError);
  };

  roomSelect.addEventListener('change', matchRoomsAndGuests);
  guestSelect.addEventListener('change', matchRoomsAndGuests);
  typeSelect.addEventListener('change', onTypeSelectChange);
  priceInput.addEventListener('keyup', onTypeSelectChange);
  priceInput.addEventListener('change', onTypeSelectChange);
  timeInSelect.addEventListener('change', onTimeinChange);
  timeOutSelect.addEventListener('change', onTimeOutChange);
  adForm.addEventListener('submit', onFormSubmit);

  window.form = {
    matchRoomsAndGuests: matchRoomsAndGuests,
    setSelectDefault: setSelectDefault,
    matchTypeAndPrice: matchTypeAndPrice
  };
})();
