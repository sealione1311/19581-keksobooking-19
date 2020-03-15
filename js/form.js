'use strict';

(function () {
  var ONE_GUEST = 1;
  var THREE_GUESTS = 3;
  var NO_GUESTS = 0;
  var ONE_ROOM = 1;
  var TWO_ROOMS = 2;
  var THREE_ROOMS = 3;
  var HUNDRED_ROOMS = 100;
  var TEXT_ONE_ROOM = 'Можно выбрать 1 гостя';
  var TEXT_TWO_ROOMS = 'Можно выбрать 1 или 2 гостя';
  var TEXT_THREE_ROOMS = 'Можно выбрать 1, 2 или 3 гостей';
  var TEXT_HUNDRED_ROOMS = 'Выбирете вариант "не для гостей"';
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
  var roomsError = window.data.createElement('span', '.ad-form__element--capacity', 'capacity_error');
  var typeError = window.data.createElement('span', '.ad-form__element--price', 'price_error');
  var matchRoomsAndGuests = function () {
    var roomNumber = parseInt(roomSelect.value, 10);
    var capacity = parseInt(guestSelect.value, 10);
    switch (true) {
      case (roomNumber === ONE_ROOM && capacity !== ONE_GUEST):
        roomSelect.setCustomValidity(TEXT_ONE_ROOM);
        roomsError.textContent = TEXT_ONE_ROOM;
        break;
      case ((roomNumber === TWO_ROOMS && capacity === THREE_GUESTS) || (roomNumber === TWO_ROOMS && capacity === NO_GUESTS)):
        roomSelect.setCustomValidity(TEXT_TWO_ROOMS);
        roomsError.textContent = TEXT_TWO_ROOMS;
        break;
      case (roomNumber === THREE_ROOMS && capacity === NO_GUESTS):
        roomSelect.setCustomValidity(TEXT_THREE_ROOMS);
        roomsError.textContent = TEXT_THREE_ROOMS;
        break;
      case (roomNumber === HUNDRED_ROOMS && capacity !== NO_GUESTS):
        roomSelect.setCustomValidity(TEXT_HUNDRED_ROOMS);
        roomsError.textContent = TEXT_HUNDRED_ROOMS;
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
    window.backend.save(new FormData(adForm), window.map.onLoadData, window.advertsFilter.onError);
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
