'use strict';

var MIN_WIDTH = 0;
var MAX_WIDTH = 1150;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 65;
var PIN_HEIGTH = 88;
var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_ADVERTS = 8;
var ENTER_KEY = 'Enter';
var LEFT_KEY_MOUSE = 1;
var pinList = document.querySelector('.map__pins');
var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');
var adForm = document.querySelector('.ad-form');
var addressInput = adForm.querySelector('input[name=address]');
var mainPin = document.querySelector('.map__pin--main');
var formElements = adForm.querySelectorAll('fieldset');
var filtersElements = document.querySelectorAll('[name^=housing-]');
var roomSelect = adForm.querySelector('#room_number');
var guestSelect = adForm.querySelector('#capacity');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomArray = function (array) {
  var randomArray = array.slice(0, getRandomNumber(1, array.length));
  return randomArray.sort(function () {
    return 0.5 - Math.random();
  });
};

var generateAdvert = function (idx) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (idx + 1) + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: '600, 350',
      price: 2000,
      type: getRandomElement(HOUSING_TYPE),
      rooms: 2,
      guests: 4,
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKOUT),
      features: getRandomArray(FEATURES),
      description: 'строка с описанием',
      photos: getRandomElement(PHOTOS),
    },
    location: {
      x: getRandomNumber(MIN_WIDTH, MAX_WIDTH - PIN_WIDTH / 2),
      y: getRandomNumber(MIN_Y, MAX_Y - PIN_HEIGTH)
    }
  };
};

var generateAdverts = function (count) {
  var adverts = [];
  for (var i = 0; i < count; i++) {
    adverts.push(generateAdvert(i));
  }
  return adverts;
};

var renderPin = function (object) {
  var newPin = pinTamplate.cloneNode(true);
  var newPinImg = newPin.querySelector('img');
  newPin.setAttribute('style', 'left: ' + (object.location.x + PIN_WIDTH / 2) + 'px; top: ' + (object.location.y + PIN_HEIGTH) + 'px');
  newPinImg.src = object.author.avatar;
  newPinImg.alt = object.offer.title;
  return newPin;
};

var renderPins = function (advertsArr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertsArr.length; i++) {
    fragment.appendChild(renderPin(advertsArr[i]));
  }
  return fragment;
};

var toggleDisabledElements = function (elements, value) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = value;
  }
};

var disableMap = function () {
  adForm.classList.add('ad-form--disabled');
  toggleDisabledElements(formElements, true);
  toggleDisabledElements(filtersElements, true);
};

var activateMap = function () {
  toggleDisabledElements(formElements, false);
  toggleDisabledElements(filtersElements, false);
  adForm.classList.remove('ad-form--disabled');
  document.querySelector('.map').classList.remove('map--faded');
  pinList.appendChild(renderPins(generateAdverts(NUMBER_ADVERTS)));
  mainPin.removeEventListener('mousedown', activateMap);
  mainPin.removeEventListener('keydown', activateMap);
  matchRoomsAndGuests();
};

var createElement = function (tag, parentClass, elementClass) {
  var elementNew = document.createElement(tag);
  var parent = document.querySelector(parentClass);
  elementNew.classList.add(elementClass);
  parent.append(elementNew);
  return elementNew;
};

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
  }
  roomsError.setAttribute('style', 'color: red');
};

var roomsError = createElement('span', '.ad-form__element--rooms', 'rooms_error');

disableMap();
mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === LEFT_KEY_MOUSE) {
    activateMap();
    addressInput.value = mainPin.style.left + ' ' + mainPin.style.top;
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activateMap();
  }
});
roomSelect.addEventListener('change', function () {
  matchRoomsAndGuests();
});

guestSelect.addEventListener('change', function () {
  matchRoomsAndGuests();
});
