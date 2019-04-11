export function initInterceptResponseHandler(axios) {
  axios.interceptors.response.use(function (response) {
    if (!response.config.interceptResponseErrors) {
      return response;
    }

    let isResponseSuccessful = response.config.validateStatus(response.status);
    if (isResponseSuccessful) {
      return response;
    }

    // show notification and return nothing, or use custom response handler instead
    alert([response.status, response.statusText].join(' - '));
  }, function (error) {
    if (!error.config.interceptResponseErrors) {
      return Promise.reject(error);
    }

    let { response } = error;
    if (response.data && response.data.errors) {
      alert(response.data.errors.join('; '));
    }

    return Promise.reject(error);
  });

}