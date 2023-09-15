function formSubmit(self) {
  event.preventDefault();

  const data = new FormData(self);

  const { origin, pathname } = window.location;
  const emptyParams = {};
  const paramsFromUrl = new URLSearchParams(window.location.search).toString().split('&');
  const queryForm = new URLSearchParams(data).toString().split('&');

  if (paramsFromUrl.length > 1) {
    paramsFromUrl.forEach(el => {
      const [key, value] = el.split('=');
      emptyParams[decodeURI(key)] = value;
    });
  }

  queryForm.forEach(el => {
    const [key, value] = el.split('=');
    emptyParams[decodeURI(key)] = value;
  });

  let action = origin + pathname + "?" + new URLSearchParams(emptyParams).toString();

  History.pushState(null, document.title, action);
  $(".alert-dark").html(decodeURI(History.getState().url));
}
