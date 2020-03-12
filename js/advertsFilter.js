'use strict';

(function () {
  var HOUSING__PRICE = {
    lowMax: 10000,
    middleMin: 10000,
    middleMax: 50000,
    hightMin: 50000
  };
  var advertsData = [];
  var adverts = [];
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');

  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var onLoad = function (data) {
    advertsData = data;
    window.pins.render(window.data.sortedArray(advertsData));
  };

  var onError = function (errorMassage) {
    window.messages.error(errorMassage);
  };

  var getHousingType = function (advert) {
    return housingType.value === 'any' ? true : advert.offer.type === housingType.value;
  };
  var getHousingPrice = function (advert) {
    switch (housingPrice.value) {
      case ('low'):
        return advert.offer.price < HOUSING__PRICE.lowMax;

      case ('middle'):
        return advert.offer.price >= HOUSING__PRICE.middleMin && advert.offer.price < HOUSING__PRICE.middleMax;

      case ('high'):
        return advert.offer.price >= HOUSING__PRICE.hightMin;
    }
    return true;
  };

  var getHousingRooms = function (advert) {
    return housingRooms.value === 'any' ? true : advert.offer.rooms.toString() === housingRooms.value;
  };

  var getHousingGuests = function (advert) {
    return housingGuests.value === 'any' ? true : advert.offer.guests.toString() === housingGuests.value;
  };

  var getHousingFeatures = function (advert) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    var checkedFeaturesArray = Array.from(checkedFeatures);
    return checkedFeaturesArray.every(function (feature) {
      return advert.offer.features.includes(feature.value);
    });
  };

  var filtrate = function () {
    adverts = advertsData.slice(0);
    adverts = adverts.filter(function (advert) {
      return getHousingType(advert) && getHousingPrice(advert) && getHousingRooms(advert) && getHousingGuests(advert) && getHousingFeatures(advert);
    });
  };

  var reload = function () {
    window.debounce(filtrate);
    window.data.removeCard();
    window.data.removePins();
    window.pins.render(adverts);
  };

  mapFilters.addEventListener('change', reload);
  window.adverts = {
    onLoad: onLoad,
    onError: onError,
  };
})();
