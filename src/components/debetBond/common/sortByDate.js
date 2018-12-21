import stringToDate from "./stringToDate";

const sortByDate =(a, b) => {
    return stringToDate(a) > stringToDate(b) ? 1 : -1;
};

export default sortByDate;
