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

const destroy = (id, callback) => {
  return fetch(`/api/event/${id}`, {
    method: 'DELETE',
    accept: "application/json"
  }).then(checkStatus)
      .then(parseJSON)
      .then(callback);
};

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
