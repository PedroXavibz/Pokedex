import { TIMEOUT_SEC } from './config';

/**
 * Reject request if timeout
 * @param {number} s Number of seconds for wait
 * @returns {Promise} Returns a rejected promise
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * This function fetches data from the API
 * @param {string} url Url passed as argument will be used for fetch
 * @returns {Promise | Error} Returns a fulfilled promise otherwise a error
 */
export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = response.json();

    if (!response.ok) throw new Error(`Somethin went wrong ${response.status}`);

    return data;
  } catch (err) {
    throw err;
  }
};
