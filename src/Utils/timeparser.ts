export const timeparser = (time: string): string => {
    let ISO_8601_re = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?(Z|[+-]\d{2}(?::\d{2})?)$/
    let m = time.match(ISO_8601_re);
    if (m) {
        let year = +m[1],
            month = +m[2],
            dayOfMonth = +m[3],
            hour = +m[4],
            minute = +m[5],
            second = +m[6],
            ms = +m[7], // +'' === 0
            timezone = m[8];
        let timezoneOffset
        if (timezone === 'Z') timezoneOffset = 0;
        else  {
            let timezoneArr = timezone.split(':')
            timezoneOffset = +(timezoneArr[0][0]+'1') * (60*(+timezoneArr[0].slice(1)) + (+timezoneArr[1] || 0));
        }

        let date = new Date();
        date.getFullYear()
        date.getDay()
        date.getDate()
        date.setUTCFullYear(year);
        date.setUTCMonth(month - 1);
        date.setUTCDate(dayOfMonth);
        date.setUTCHours(hour);
        date.setUTCMinutes(minute + timezoneOffset); // timezone offset set here, after hours
        date.setUTCSeconds(second);
        date.setUTCMilliseconds(ms);
        let parsedDateArr = date.toString().split(' ')
        return parsedDateArr[2] + ' ' + parsedDateArr[1] + ' ' + parsedDateArr[3] + ' ' + parsedDateArr[4]
    }
    return time
}