function formSubmit(self) {
  event.preventDefault();

  const data = new FormData(self);
  const state = History.getState();

  /* ------ Необходимо изменить данную часть кода ------ */

  // получаем текущий URL
  const currentURL = new URL(state.url);
  // получаем текущие параметры запроса
  const urlParams = currentURL.searchParams;
  // создаем объект для сохранения данных формы
  const formData = {};

  // обработка полей из данных формы
  for (let [key, value] of data.entries()) {
    // фильтруем пустые значения
    if (value.trim()) {
      formData[key] = value;
    }
    else {
      // удаляем ключи с пустыми значениями из URL
      urlParams.delete(key);
    }
  }

  // добавляем оставшиеся параметры из URL в окончательные параметры
  for (let [key, value] of urlParams.entries()) {
    formData[key] = value;
  }

  // создаем новый URL с окончательными параметрами запроса
  const newURL = new URL(currentURL.origin + currentURL.pathname);
  for (let [key, value] of Object.entries(formData)) {
    newURL.searchParams.set(key, value);
  }
  const action = newURL.toString();

  /* ------ Конец ------ */

  History.pushState(null, document.title, action);
  $(".alert-dark").html(decodeURI(History.getState().url));
}
