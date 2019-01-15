const stringToDate = maturityDate => {
  if (!maturityDate) return new Date(0, 0, 0);
  const dateArray = maturityDate.toString().split("/");
  return new Date(dateArray[2], dateArray[1], dateArray[0]);
};

export default stringToDate;
