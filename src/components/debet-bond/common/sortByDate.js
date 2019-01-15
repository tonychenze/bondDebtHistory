import stringToDate from "./stringToDate";

const asc = (a, b) => {
  return stringToDate(a) > stringToDate(b) ? 1 : -1;
};
const desc = (a, b) => {
  return stringToDate(a) > stringToDate(b) ? -1 : 1;
};

export default { asc, desc };
