export function deleteObject(listToFilter, idObjectToRemove) {
    for (let i = 0; i < listToFilter.length; i++) {
        if (listToFilter[i].id === idObjectToRemove) {
            listToFilter.splice(i,1);
        }
    }
    return listToFilter;
}

export function replaceObject(listToReplace, objectToReplace) {
    for (let i = 0; i < listToReplace.length; i++) {
        if (listToReplace[i].id === objectToReplace.id) {
            listToReplace[i].description = objectToReplace.description
            listToReplace[i].last_updated = objectToReplace.last_updated
            listToReplace[i].status = objectToReplace.status
            listToReplace[i].logo = objectToReplace.logo
        }
    }
    return listToReplace;
}