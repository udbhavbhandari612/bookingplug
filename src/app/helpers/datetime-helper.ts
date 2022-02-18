export const convertIntoMeridianTime = (time) => {
    let hours = parseInt(time.split(':')[0])
    const minutes = time.split(':')[1]
    let meriadian = 'AM';

    if (hours > 12) {
        hours = hours - 12
        meriadian = 'PM'
    }
    else if (hours === 0) {
        hours = 12

    }
    else if (hours === 12) {
        meriadian = "PM"

    }

    return `${Math.floor(hours / 10) === 0 ? '0' + hours : hours}:${minutes} ${meriadian}`

}

export const months = () => {
    return [
        { num: "01", value: 'January' },
        { num: "02", value: 'February' },
        { num: "03", value: 'March' },
        { num: "04", value: 'April' },
        { num: "05", value: 'May' },
        { num: "06", value: 'June' },
        { num: "07", value: 'July' },
        { num: "08", value: 'August' },
        { num: "09", value: 'September' },
        { num: "10", value: 'October' },
        { num: "11", value: 'November' },
        { num: "12", value: 'December' }
    ]
}

export const years = (limit) => {
    const years = []
    for (let i = 0; i < limit; i++) {
        years.push(new Date().getFullYear() + i)
    }
    return years;
}