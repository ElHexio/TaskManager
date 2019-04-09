import axios from 'axios';

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

axios.interceptors.response.use(function (response) {
  let isResponseSuccessful = response.config.validateStatus(response.status);
  if (isResponseSuccessful) {
    return response;
  }

  // show notification and return nothing, or use custom response handler instead
  alert([response.status, response.statusText].join(' - '));
}, function (error) {
  let { response } = error;
  if (response.data && response.data.errors) {
    alert(response.data.errors.join('; '));
  }

  return Promise.reject(error);
});

export function fetch(method, url, body) {
  const options = {
    method,
    headers: headers(),
    data: body,
    url,
  };

  return axios(options);
}
