export const dateArraySort = (arr) => {
    arr.sort(function (a, b) {
        const first = (a.day).substring(3,5) + (a.day).substring(0,2) + a.number;
        const second = (b.day).substring(3,5) + (b.day).substring(0,2) + b.number;

        return first - second;
    });

    return arr;
}

const firstLastDateCalculator = (startDate) => {
    const curr = new Date(startDate);
    const first = curr.getDate() - curr.getDay() + 1;
    const last = first + 6;

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
    const firstDay = firstLastDateCalculator(startDate)[0];
    const lastDay = firstLastDateCalculator(startDate)[1];
    const first = firstLastDateCalculator(startDate)[2];
    const last = firstLastDateCalculator(startDate)[3];

    const daysObject = {
        id: firstDay,
        days: []
    };

    for (var i = first; i < last; i++){

    }
    
    const dayItem = {
        id: '',
        number: ''
    };

    dayItem.id = 1;
    dayItem.number = 1;

    console.log( first);
    console.log( last );

    /**
     * firstdate al => last date e itemleri array e koy
     * id'lerine bakarak days oluştur
     * idlerin olduğu yerler isReserved: true olacak in const day
     */

}