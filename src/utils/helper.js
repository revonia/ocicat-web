/**
 * Created by SiriusWangs on 2017/4/28.
 */

export function timestampToDatetime(timestamp) {
  const date = new Date(timestamp * 1000);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${convDayToChs(date.getDay())} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function timestampToTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function convDayToChs(day) {
  switch (day) {
    case 0:
      return '星期日';
    case 1:
      return '星期一';
    case 2:
      return '星期二';
    case 3:
      return '星期三';
    case 4:
      return '星期四';
    case 5:
      return '星期五';
    case 6:
      return '星期六';
    default:
      return null;
  }
}
