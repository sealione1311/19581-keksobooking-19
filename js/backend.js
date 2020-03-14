'use strict';

(function () {

  var STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNATHORIZED: 401,
    NOT_FOUND: 404,
  };
  var TIMEOUT_IN_MS = 10000;
  var METHODS = {
    GET: 'GET',
    POST: 'POST'
  };
    var RESPONSE_TYPE = 'json';

  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS_CODE.OK:
          onLoad(xhr.response);
          break;
        case STATUS_CODE.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case STATUS_CODE.UNATHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case STATUS_CODE.NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(METHODS.GET, URL);
    xhr.send();
  };

  var save = function (data, onLoadData, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS_CODE.OK:
          onLoadData();
          break;
        case STATUS_CODE.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case STATUS_CODE.UNATHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case STATUS_CODE.NOT_FOUND:
          error = 'Ничего не найдено';
        break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(METHODS.POST, URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
