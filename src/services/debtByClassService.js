import http from "./httpService";
const apiURL = "http://localhost:3500/api";

function getBonds() {
  return http.get(apiURL + "/bonditems");
}

export default {
  getBonds
};
