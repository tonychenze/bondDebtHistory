const getTypeFromRows = rows => {
  const rowObj = rows.reduce((acc, cur) => {
    acc[cur["instrument"]] = cur["instrument"];
    return acc;
  }, {});
  return Object.getOwnPropertyNames(rowObj);
};

export default getTypeFromRows;
