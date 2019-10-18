/* @flow */
export const getArrayOfDatesPeriod = (startOf, endOf) => {
    const days = [];
    let day = startOf;

    while (day <= endOf) {
        days.push(day.format('YYYY-MM-DD'));
        day = day.clone().add(1, 'd');
    }

    return days;
};

export const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
