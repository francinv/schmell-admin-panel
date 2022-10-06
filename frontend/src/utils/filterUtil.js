export const deleteObject = (listToFilter, idObjectToRemove) => listToFilter.filter(object => object.id !== idObjectToRemove);

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

export const replaceUsingMap = (listToReplace, objectToReplace) => {
    return listToReplace.map(function (item) {
        return item.id == objectToReplace.id ? objectToReplace : item;
    });
};