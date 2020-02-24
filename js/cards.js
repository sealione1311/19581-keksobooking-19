'use strict';

(function () {
  var cardTamplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinList = document.querySelector('.map__pins');
  var NUMBER_ADVERTS = 3;
  var typeOfHousing = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var renderFeatures = function (object) {
    var featuresList = document.createDocumentFragment();
    var newFeatures = document.createElement('ul');
    newFeatures.classList.add('popup__features');
    featuresList.appendChild(newFeatures);
    object.offer.features.forEach(function (feature) {
      var newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature');
      newFeature.classList.add('popup__feature--' + feature);
      newFeatures.appendChild(newFeature);
    });
    return featuresList;
  };

  var renderPhotos = function (object) {
    var photosList = document.createDocumentFragment();
    var newPhotos = document.createElement('div');
    photosList.appendChild(newPhotos);
    object.offer.photos.forEach(function (src) {
      var newPhoto = document.createElement('img');
      newPhoto.classList.add('popup__photo');
      newPhoto.width = 45;
      newPhoto.height = 40;
      newPhoto.alt = object.offer.title;
      newPhoto.src = src;
      newPhotos.appendChild(newPhoto);
    });
    return photosList;
  };

  var renderCard = function (object) {
    var newCard = cardTamplate.cloneNode(true);
    newCard.querySelector('.popup__title').textContent = object.offer.title;
    newCard.querySelector('.popup__text--address').textContent = object.offer.address;
    newCard.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = typeOfHousing[object.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    newCard.querySelector('.popup__description').textContent = object.offer.discription;
    newCard.querySelector('.popup__avatar').src = object.author.avatar;
    newCard.querySelector('.popup__features').replaceWith(renderFeatures(object));
    newCard.querySelector('.popup__photos').replaceWith(renderPhotos(object));
    var emptyElements = newCard.querySelectorAll('p:empty, ul:empty, div:empty');
    emptyElements.forEach(function (element) {
      element.remove();
    });
    return newCard;
  };

  var renderCards = function (advertsArray) {
    var advertsNumber = advertsArray.length > NUMBER_ADVERTS ? NUMBER_ADVERTS : advertsArray.length;
    var fragment = document.createDocumentFragment();
    for (var i = 2; i < advertsNumber; i++) {
      fragment.appendChild(renderCard(advertsArray[i]));
    }
    pinList.after(fragment);
  };

  window.cards = {
    render: renderCards
  };
})();
