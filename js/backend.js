'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var RESPONSE_TYPE = 'json';
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNATHORIZED: 401,
    NOT_FOUND: 404,
  };
  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

  var renderXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case StatusCode.UNATHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case StatusCode.NOT_FOUND:
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

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = renderXhr(onLoad, onError);
    xhr.open(Method.GET, URL_LOAD);
    xhr.send();
  };

  var save = function (data, onLoadData, onError) {
    var xhr = renderXhr(onLoadData, onError);
    xhr.open(Method.POST, URL_SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
