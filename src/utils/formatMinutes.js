function formatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  let str = '';

  if (hours > 0) {
    str += `${padToTwoDigits(hours)}h`;
  }

  if (minutes > 0) {
    str += `${padToTwoDigits(minutes)}m`;
  }

  return str;
}

function padToTwoDigits(num) {
  return num.toString().padStart(2, '0');
}

module.exports = formatMinutes;
