export const dateArraySort = (arr) => {
  arr.sort(function (a, b) {
    const first = (a.day).substring(3, 5) + (a.day).substring(0, 2) + a.number;
    const second = (b.day).substring(3, 5) + (b.day).substring(0, 2) + b.number;

    return first - second;
  });

  return arr;
}

const firstLastDateCalculator = (startDate) => {
  const curr = new Date(startDate);
  const first = curr.getDate() - curr.getDay() + 1;
  const last = first + 5;

  const firstDay = new Date(curr.setDate(first));
  let lastDay = new Date(curr.setDate(last));

  if (first <= 0) {
    lastDay = new Date(
      curr.getFullYear(),
      curr.getMonth() + 1,
      last);
  }
  else {
    lastDay = new Date(curr.setDate(last));
  }

  return [firstDay, lastDay];
}

export const getDateStringFromStartDate = (startDate) => {
  const firstday = firstLastDateCalculator(startDate)[0];

  const dateString = firstday.toLocaleDateString().substring(6) + '-' + firstday.toLocaleDateString().substring(3, 5) +
    '-' + firstday.toLocaleDateString().substring(0, 2) + 'T13:00:00';

  return dateString;
}

export const organizeAppointmentBoxDates = (
  startDate,
  datesAll
) => {
  const firstDay = firstLastDateCalculator(startDate)[0];
  const lastDay = firstLastDateCalculator(startDate)[1];

  let tempArr = [];
  const fTime = firstDay.getTime();
  const lTime = lastDay.getTime();
  tempArr = datesAll.filter((function callbacFn(date) {
    const dfTime = new Date(
      date.day.substring(6),
      date.day.substring(3, 5) - 1,
      date.day.substring(0, 2), 22)?.getTime();
    const dlTime = new Date(
      date.day.substring(6),
      date.day.substring(3, 5) - 1,
      date.day.substring(0, 2), 10)?.getTime();

    return fTime <= dfTime && dlTime <= lTime;
  }));

  const daysObject = {
    id: firstDay,
    days: []
  };

  let arr = [];
  for (var i = 1; i <= 24; i++) {
    const dayItem = {
      id: '',
      number: '',
      isReserved: false
    };

    dayItem.id = i;
    dayItem.number = i % 4 === 0 ? 4 : i % 4;

    tempArr.forEach((date) => {
      if (date.id === dayItem.id) {
        dayItem.isReserved = true;
      }
    })
    arr.push(dayItem);

    if (i % 4 === 0) {
      daysObject.days.push(arr);
      arr = [];
    }
  }

  return daysObject;
}