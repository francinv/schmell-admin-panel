

export function sortDate(date) {
    const tempDate = date.split("-");
    return tempDate[2] +"." +tempDate[1] + "." + tempDate[0]
}

export function getAllowedDate(date) {
    const tempDate = date.split(':');
    return tempDate[0] + ":" + tempDate[1];
}