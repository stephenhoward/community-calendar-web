const datetimeFormats = {
    en: {
        time: {
            hour: 'numeric', minute: 'numeric', hour12: true
        },
        short: {
            month: 'short', day: 'numeric'
        },
        'long': {
            month: 'long', day: 'numeric',
        },
        'long-datetime': {
            weekday: 'long', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', hour12: true
        },
        'month': {
            month: 'long'
        },
        'month-year': {
            month: 'long', year: 'numeric'
        },
        'assist': {
            weekday: 'long', month: 'long', day: 'numeric'
        }
    },
    es: {
        time: {
            hour: 'numeric', minute: 'numeric', hour12: true
        },
        short: {
            month: 'short', day: 'numeric'
        },
        'long': {
            month: 'long', day: 'numeric',
        },
        'long-datetime': {
            weekday: 'long', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', hour12: true
        },
        'month': {
            month: 'long'
        },
        'month-year': {
            month: 'long', year: 'numeric'
        },
        'assist': {
            weekday: 'long', month: 'long', day: 'numeric'
        }
    }
};
export default datetimeFormats;