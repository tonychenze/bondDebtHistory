import http from "./httpService";
//const apiURL = "http://localhost:3500/api";

function getBonds() {
  //calling local service
  //return http.get(apiURL+ "/bonditems");

  //return mock data from the local
  return http.get("bondItemsMock.json");
}

export default {
  getBonds
};
