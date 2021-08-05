export const format_time = function format_time(date) {
  return date.toLocaleTimeString();
}
export const format_date =  function format_date(date) {
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear() + 5}`;
}
