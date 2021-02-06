import superagentPromise from "superagent-promise";
import _superAgent from "superagent";

const superagent = superagentPromise(_superAgent, global.Promise);
//const API_ROOT = "http://localhost:8000/api";
const API_ROOT = "http://apidemo.scanteie.eu/api";
const API_ROOT2 = "http://apidemo.scanteie.eu";
const responseBody = (response) => response.body;

let token = null;

const tokenPlugin = (secured) => {
  return (request) => {
    if (token && secured) {
      request.set("Authorization", `Bearer ${token}`);
    }
  };
};

export const requests = {
  get: (url, secured = false) => {
    //console.log("GET token", url, token, secured);
    return superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin(secured))
      .then(responseBody);
  },
  post: (url, body = null, secured) => {
    //console.log("POST token", token);
    return superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin(secured))
      .then(responseBody);
  },
  setToken: (jwtToken) => (token = jwtToken),
  upload: (url, file, secured = true) => {
    return superagent
      .post(`${API_ROOT}${url}`)
      .attach("file", file)
      .use(tokenPlugin(secured))
      .then(responseBody);
  },
  delete: (url, secured = true) => {
    return superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin(secured))
      .then(responseBody);
  },
};
