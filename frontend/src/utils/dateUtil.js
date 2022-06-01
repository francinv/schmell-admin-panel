export const sortDate = date => new Date(date).toLocaleString('no-NO', {day: '2-digit', month: '2-digit', year: 'numeric'});

export const getAllowedDate = date => date.slice(0, 16);

export const getParsedDate = () => new Date().toLocaleString('no-NO', {month: 'short', day: 'numeric', year: 'numeric'});

export const getDateFromDate = date => new Date(date).toLocaleString('no-NO', {month: 'long', day: 'numeric', year: 'numeric'});

export const getTimeFromDate = date => new Date(date).toLocaleTimeString('no-NO', {hour: 'numeric', minute: '2-digit', timeZone: 'UTC'});

export const getFullDate = date => new Date(date).toLocaleString("no-NO", {month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: "h24"});