const stringToDate = maturityDate => {
  const dateArray = maturityDate.toString().split("/");
  return new Date(dateArray[2], dateArray[1], dateArray[0]);
};

export default stringToDate;
