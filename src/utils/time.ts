import moment from 'moment-timezone';
import 'moment/min/locales';
moment.locale('ru');

export const timePassed = (time_created: string) => {
    if (!time_created)
        return null;
    const date = new Date();
    const tz_offset = date.getTimezoneOffset().toString();
    return moment.tz(time_created, "DD.MM.YYYY hh:mm", tz_offset).fromNow()
}

export const addHours = (time: string, hours = (new Date()).getTimezoneOffset.toString()) => {
    return moment.tz(time, "DD.MM.YYYY hh:mm", hours).format('D MMMM YYYY');
}
