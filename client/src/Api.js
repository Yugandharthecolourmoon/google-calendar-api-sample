require('es6-promise').polyfill();
require('isomorphic-fetch');

/**
 * To get list of events
 * @param milliseconds Date in milliseconds
 * @param callback Callback function
 * @returns {Promise<Response | never>}
 */
const index = (milliseconds, callback) => {
  return fetch(`/api/events`, {
    method: 'POST',
    accept: "application/json",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({date: new Date(milliseconds).toISOString().substr(0, 10)})
  }).then(checkStatus)
      .then(parseJSON)
      .then(callback);
};

/**
 * To create new event
 * @param body Event body
 * @param callback Callback Function
 * @returns {Promise<Response | never>}
 */
const create = (body, callback) => {
  return fetch(`/api/event`, {
    method: 'POST',
    accept: "application/json",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(body)
  }).then(checkStatus)
      .then(parseJSON)
      .then(callback);
};

/**
 * To delete event
 * @param id Event Id
 * @param callback Callback Function
 * @returns {Promise<Response | never>}
 */
const destroy = (id, callback) => {
  return fetch(`/api/event/${id}`, {
    method: 'DELETE',
    accept: "application/json"
  }).then(checkStatus)
      .then(parseJSON)
      .then(callback);
};

/**
 * To check the response status and handle errors
 * @param response Fetch response
 * @returns {*}
 */
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  window.alert('Error Occurred! Unable to complete request.');
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
};

const parseJSON = (response) => {
  return response.json();
};

const Api = {
  index,
  create,
  destroy
};

export default Api;
