import moment from 'moment-timezone';
import 'moment/min/locales';
moment.locale('ru');

export const timePassed = (time_created) => {
    if (!time_created)
        return null;
    return moment.tz(time_created, "DD.MM.YYYY hh:mm", Date().getTimezoneOffset).fromNow()
}

export const addHours = (time, hours = Date().getTimezoneOffset) => {
    return moment.tz(time, "DD.MM.YYYY hh:mm", hours).format('D MMMM YYYY');
}
