function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

// curl -X GET localhost:3001/articles
function getJSON(url, resolve, error) {
  fetchJSON(url, resolve, error);
}

// curl -X PATCH -d author="Not Me" localhost:3001/articles/2 
function patchJSON(url, body, resolve, error) {
  fetchJSON(url, resolve, error, {method: 'PATCH', body});
}

// curl -X DELETE localhost:3001/articles/2 
function deleteJSON(url, resolve, error) {
  fetchJSON(url, resolve, error, {method: 'DELETE'});
}

// curl -X POST -H "Content-Type: application/json" -d '{"title":"ccc","author":"333"}' localhost:3001/articles
function postJSON(url, payload, resolve, error) {
  fetchJSON(url, resolve, error, 
    {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
}

function fetchJSON(url, resolve, error, parameters) {
  fetch(url, parameters)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => resolve(data))
    .catch(ex => error(ex));
}

export default {
  getJSON,
  patchJSON,
  deleteJSON,
  postJSON,
}
