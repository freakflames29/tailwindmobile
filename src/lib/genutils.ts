import moment from "moment";

export const formatDate = (date: string) => {
  return moment(date).format("DD MMM, YYYY");
};

export const getFormattedToday = () => {
  return moment().format("D MMM YYYY. dddd");
};
// Example output on 23 Nov 2025: "23 Nov 2025. Sunday"

export function getTodayISOFormat() {
  return moment().format('YYYY-MM-DD');
}