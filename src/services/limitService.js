import http from "./httpService";
import { apiURL } from "../config.json";

function getLimits() {
  return http.get(apiURL + "/limits");
}

async function getLimit(id) {
  const { data: limits } = await http.get(apiURL + "/limits");
  for (let limit of limits) {
    if (limit._id === id) return limit;
  }
  return {};
}

export default {
  getLimits,
  getLimit
};
