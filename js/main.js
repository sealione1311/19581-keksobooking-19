'use strict';

var MIN_WIDTH = 0;
var MAX_WIDTH = 1150;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 40;
var PIN_HEIGTH = 44;
var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_ADVERTS = 8;
var pinList = document.querySelector('.map__pins');
var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomArray = function (array) {
  var randomArray = array.slice(0, getRandomNumber(1, array.length));
  return randomArray.sort(function (a, b) {
    return 0.5 - Math.random();
  });
};

var generateAdvert = function (idx) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (idx + 1)  + '.png'
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
      x: getRandomNumber(MIN_WIDTH, MAX_WIDTH),
      y: getRandomNumber(MIN_Y, MAX_Y)
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

document.querySelector('.map').classList.remove('map--faded');
pinList.appendChild(renderPins(generateAdverts(NUMBER_ADVERTS)));
