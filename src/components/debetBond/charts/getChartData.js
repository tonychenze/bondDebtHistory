import stringToDate from "../common/stringToDate";
const getChartData = (list, path) => {
  //reducedListObj:{dateInt : value }
  //{1538262000000: 50612.47}
  const reducedListObj = list.reduce((acc, cur) => {
    const dateInt = stringToDate(cur.maturityDate).getTime();
    if (acc[dateInt]) {
      acc[dateInt] += cur[path];
    } else {
      acc[dateInt] = cur[path];
    }
    return acc;
  }, {});

  const sortByDateList = Object.keys(reducedListObj)
    .sort((a, b) => a - b)
    .reduce((acc, cur) => {
      acc.push([parseInt(cur), Math.floor(reducedListObj[cur] * 100) / 100]);
      return acc;
    }, []);

  return sortByDateList;
};

export default getChartData;
