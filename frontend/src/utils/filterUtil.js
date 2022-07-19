export const deleteObject = (listToFilter, idObjectToRemove) => {
    for (let i = 0; i < listToFilter.length; i++) {
        if (listToFilter[i].id === idObjectToRemove) {
            listToFilter.splice(i,1);
        }
    }
    return listToFilter;
}

export const replaceObject = (listToReplace, objectToReplace) => {
    for (const element of listToReplace) {
        if (element.id === objectToReplace.id) {
            element.description = objectToReplace.description
            element.last_updated = objectToReplace.last_updated
            element.status = objectToReplace.status
            element.logo = objectToReplace.logo
        }
    }
    return listToReplace;
}