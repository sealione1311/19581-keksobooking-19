'use strict'

var MIN_WIDTH = 0;
var MAX_WIDTH = 1150;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 40;
var PIN_HEIGTH = 44;
var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
var NUMBER_ADVERTS = 8;
var adverts = [];
var pinList = document.querySelector('.map__pins');
var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomArray = function (array) {
  var randomArray = [];
  for (var i = 0; i < getRandomNumber(1, array.length); i++) {
    randomArray[i] = getRandomElement(array);
    var idx = randomArray.indexOf(randomArray[i]);
    if (idx === -1){
      randomArray.push(randomArray[i]);
    }
  }
  return randomArray;
}

var getAdvertsArray = function (adverts) {
  adverts[i] =
  {
    author: {
      avatar:'img/avatars/user0' + (i + 1) + '.png'
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
  }
  adverts.push(adverts[i]);
}


var getNewPin = function (advert){
  var newPin = pinTamplate.cloneNode(true);
  var newPinImg = newPin.querySelector('img');
  newPin.setAttribute('style', 'left: ' + (advert.location.x + PIN_WIDTH / 2) + 'px; top: ' + (advert.location.y + PIN_HEIGTH) + 'px');
  newPinImg.src = advert.author.avatar;
  newPinImg.alt = advert.offer.title;
  return newPin;
}

var renderPins = function (adverts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <adverts.length; i++) {
    fragment.appendChild(getNewPin(adverts[i]));
  }
  return fragment;
}

for (var i = 0; i < NUMBER_ADVERTS; i++) {
  getAdvertsArray(adverts)
};
pinList.appendChild(renderPins(adverts));
document.querySelector('.map').classList.remove('map--faded');
console.log (adverts);
