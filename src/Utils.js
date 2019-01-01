/**
 * To get current timezone
 */
const getTimezone = () => {
  const d = new Date();
  let offsetMins = d.getTimezoneOffset();
  let offset = '';
  if (offsetMins < 0) {
    offset += '+';
    offsetMins *= -1;
  } else {
    offset += '-';
  }
  const hours = Math.floor(offsetMins / 60);
  if (hours < 10) {
    offset += '0';
  }
  offset += hours;
  offset += ':';
  const mins = offsetMins % 60;
  if (mins < 10) {
    offset += '0';
  }
  offset += mins;
  return offset;
};

const Utils = {
  getTimezone
};

export default Utils;
