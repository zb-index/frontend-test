function formSubmit(self) {
  event.preventDefault();

  const data = new FormData(self);
  const state = History.getState();

  // необходимо изменить данную часть кода
  let query = new URLSearchParams(data).toString();
  let action = state.url + "?" + query;
  // конец

  History.pushState(null, document.title, action);
  $(".alert-dark").html(decodeURI(History.getState().url));
}
