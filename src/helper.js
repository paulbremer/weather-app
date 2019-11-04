export const secondsToTime = (time) => {
    const hours = new Date(time * 1000).getHours();
    return hours > 12 ? `${hours - 12}:00pm` : `${hours}:00am`;
}

export const getHours = (time) => {
    return new Date(time * 1000).getHours();
}

export const getDateTime = (time) => {
    return new Date(time * 1000).toDateString();
}

export const mileToKilometer = (number) => {
    return Math.round(number * 1.60934);
}
