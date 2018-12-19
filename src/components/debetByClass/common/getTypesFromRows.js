const getTypeFromRows = rows => {
  return rows.reduce((acc, cur) => {
    acc[cur["instrument"]] = cur["instrument"];
    return acc;
  }, {});
};

export default getTypeFromRows;
