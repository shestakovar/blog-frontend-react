import moment from 'moment-timezone';
import 'moment/min/locales';
moment.locale('ru');

export const timePassed = (time_created: string | null) => {
    if (!time_created)
        return null;
    return moment.tz(time_created, "DD.MM.YYYY hh:mm", '').fromNow()
}

export const addHours = (time: string) => {
    return moment.tz(time, "DD.MM.YYYY hh:mm", '').format('D MMMM YYYY');
}
