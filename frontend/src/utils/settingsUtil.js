export const getInputType = (type) => {
    switch (type) {
        case 'email':
            return 'email';
        case 'password':
            return 'text';
        case 'mobile_number':
            return 'tel';
        default:
            return 'text';
    }
}

export const getLabels = (type) => {
    switch (type) {
        case 'email':
            return 'E-post:';
        case 'password':
            return 'Passord:';
        case 'mobile_number':
            return 'Mobilnummer:';
        default:
            return '';
    }
}