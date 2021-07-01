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
    const last = first + 7;

    const firstDay = new Date(curr.setDate(first));
    const lastDay = new Date(curr.setDate(last));
    return [firstDay, lastDay, first, last];
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
    // REDUX ?????

    const firstDay = firstLastDateCalculator(startDate)[0];
    const lastDay = firstLastDateCalculator(startDate)[1];
    const first = firstLastDateCalculator(startDate)[2];
    const last = firstLastDateCalculator(startDate)[3];

    console.log(firstDay.getTime() === lastDay.getTime());
    console.log(firstDay.getTime() );

    const tempArr = [];
    console.log('datesAll', datesAll)
    datesAll.some(function (date) {
        console.log(date.day?.getTime());
        const fTime = firstDay.getTime();
        const lTime = lastDay.getTime();
        const dTime = date.day?.getTime();

        if (fTime <= dTime && dTime < lTime){
            tempArr.push(date);
        }
        return dTime >= lTime;
        /*
        if ((date.day).substring(3, 5) + (date.day).substring(0, 2) < lastDayDate) {
            tempArr.push(date);
        }
        return ((date.day).substring(3, 5) + (date.day).substring(0, 2) >= lastDayDate);
        */
    })

    const daysObject = {
        id: firstDay,
        days: []
    };

    // id gezzzz
    let arr = [];
    for (var i = 1; i <= 20; i++) {
        const dayItem = {
            id: '',
            number: '',
            isReserved: false
        };

        dayItem.id = i;
        dayItem.number = i;
        if ('isExistinsmth' === arr) {
            dayItem.isReserved = true;
        }

        arr.push(dayItem);

        if(i % 4 === 0){
            daysObject.days.push(arr);
            arr = [];
        }

        /*
            tempArr.forEach((date) => {
        
            })
        */
    }
    console.log(daysObject.days);

    console.log('tempArr', tempArr);
    //console.log(firstDay.toLocaleDateString());
    //console.log(lastDay.toLocaleDateString());
    //console.log(first);
    //console.log(last);

    /**
     * firstdate al => last date e itemleri array e koy
     * id'lerine bakarak days oluştur
     * idlerin olduğu yerler isReserved: true olacak in const day
     */
}