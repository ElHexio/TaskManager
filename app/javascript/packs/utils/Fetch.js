import axios from 'axios';
import { initInterceptResponseHandler } from './FetchHelper';

export function authenticityToken() {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token ? token.content : null;
}

function headers() {
  return {
    Accept: '*/*',
    'Content-Type': 'application/json',
    'X-CSRF-Token': authenticityToken(),
    'X-Requested-With': 'XMLHttpRequest',
  };
}

initInterceptResponseHandler(axios);

export function fetch(method, url, body, interceptResponseErrors = true) {
  const options = {
    method,
    headers: headers(),
    data: body,
    url,
    interceptResponseErrors
  };

  return axios(options);
}
