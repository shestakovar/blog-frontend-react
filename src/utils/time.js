import moment from 'moment-timezone';
import 'moment/min/locales';
moment.locale('ru');

export const timePassed = (time_created) => {
    return moment.tz(time_created, "DD.MM.YYYY hh:mm", Date().getTimezoneOffset).fromNow()
}

export const addHours = (time, hours = Date().getTimezoneOffset) => {
    time = '11.09.2021 13:01'
    console.log(time)
    const date = moment.tz(time, "DD.MM.YYYY hh:mm")
    console.log(date);
    return moment.tz(time, "DD.MM.YYYY hh:mm", Date().getTimezoneOffset).format('MM.DD.YYYY');
}
