import http from "./httpService";
import { apiURL } from "../config.json";

function getLimits() {
  return http.get(apiURL + "/limits");
}

export default {
  getLimits
};
