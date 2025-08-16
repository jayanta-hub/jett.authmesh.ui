import moment from "moment";

export const TimeHandler = (data) => {
  const convertedTime = data ? moment(data, "HH:mm:ss").format("HH:mm") : " ";
  return convertedTime;
}

export const dateHandler = (data) => {
  const convertedDate = data ? moment(data, "YYYY/MM/DD").format("ddd DD MMM YY") : "";
  return convertedDate;
}

export const newDateHandler = (data) => {
  const convertedDate = moment(data, "YYYY/MM/DD").format('ddd, DD MMM');
  return convertedDate;
}

export const convertDateFormat = (data) => {
  const convertedDate = data ? moment(data, "DD/MM/YY").format("YYYY-MM-DD") : "";
  return convertedDate;
}

export const newformattedDate = (data) => {
  const convertedDate = moment(data, "ddd DD MMM YY").format("DD MMM, YYYY");
  return convertedDate;
}

export const newformattedDay = (data) => {
  const convertedDate = moment(data, "ddd DD MMM YY").format("dddd, DD MMMM YYYY");
  return convertedDate;
}
export const newformattedDateMobile = (data) => {
  const convertedDate = moment(data, "ddd DD MMM YY").format("DD MMM");
  return convertedDate;
}

export const convertMinutesToHM = (data) => {
  const duration = moment.duration(data, 'minutes');
  const hours = Math.floor(duration.asHours());
  const remainingMinutes = duration.minutes();
  return `${hours}h ${remainingMinutes}m`;
}

export const newDateHandlerMultiCity = (data) => {
  const convertedDate = moment(data, "ddd DD MMM YY").format('ddd, DD MMM');
  return convertedDate;
}

export const quotationDateHandler = (data: string) => {
  const convertedDate = data ? moment(data, "ddd DD MMM YY").format("ddd, DD MMM'YY") : "";
  return convertedDate;
};
/**
 * Converts a readable date string ( "July 26th, 2025") 
 * into a specified output format ( "DD/MM/YY")
 *
 * @param inputDate - A natural language date string, possibly containing ordinal suffixes 
 *                    like "st", "nd", "rd", "th".
 * @param outputFormat - A valid Moment.js format string. Default is "DD/MM/YY".
 *
 * @returns A formatted date string based on the given output format.
 *          Returns an empty string if input is invalid or empty.
 */
export const conversationalDateHandler = (data: string): string => {
  if (!data) return "";
  const cleaned = data.replace(/(\d+)(st|nd|rd|th)/, "$1");
  const convertedDate = moment(new Date(cleaned)).format("DD/MM/YY");

  return convertedDate;
};
