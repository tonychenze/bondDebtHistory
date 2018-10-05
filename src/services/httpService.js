import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("Unexpected Error Occured");
    logger.log(error);
  }
});

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete
};
