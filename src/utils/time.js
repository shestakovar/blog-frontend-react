import moment from 'moment-timezone';
import 'moment/min/locales';
moment.locale('ru');

export const timePassed = (time_created) => {
    return moment.tz(time_created, "DD.MM.YYYY hh:mm", Date().getTimezoneOffset).fromNow()
}