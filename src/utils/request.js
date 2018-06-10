import fetch from 'dva/fetch';

function logResponse(response) {
  // console.log(response);
  return response;
}

/**
 * Requests a URL, returning a object.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {

  let header = { 'Content-Type': 'application/json' };

  if (typeof window.localStorage['user_token'] === 'string') {
    header['Authorization'] = 'Bearer ' + window.localStorage['user_token'];
  }

  let opts = { headers: header, ...options };

  const response = await fetch(url, opts).then(logResponse).catch(err => {
    throw  err;
  });

  const status = response.status;
  const authorization = response.headers.get('Authorization');

  const location = response.headers.get('Location');
  let token = (typeof authorization === 'string') ? authorization.split('Bearer ')[1] : null;

  let body = null;
  try {
    body = await response.json().catch(err => null);
    if (typeof body.token === 'string') {
      token = body.token;
    }
  } catch (e) {}

  return {
    status: status,
    token: token,
    body: body,
    ok: response.ok,
    location: location,
  };
}
