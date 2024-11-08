const fromMetersSecondToKmsHour = (value) => {
  return value * 3.6
}

const fromMetersToKms = (value) => {
  return value / 1000
}

const dateFormatter = (date) => {
  const updatedDate = new Date(date)
  const year = updatedDate.getUTCFullYear();
  const month = String(updatedDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(updatedDate.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


const convertToUTC = (date) => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
}

const unixTimestamp = (value) => {
  const date = new Date(value)
  return Math.floor(date.getTime() / 1000)
}



export { fromMetersSecondToKmsHour, fromMetersToKms, dateFormatter, unixTimestamp }