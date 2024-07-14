import moment from "moment";

export default function getDaysAgo(dateString: string): number {
  const inputDate = moment(dateString);

  const currentDate = moment();

  const daysAgo = currentDate.diff(inputDate, "days");

  return daysAgo;
}
