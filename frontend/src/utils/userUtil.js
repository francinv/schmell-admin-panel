import axiosService from "../services/axiosService";

export const checkIfUserIsLoggedIn = async () => {
    const access = localStorage.getItem('access');
    if (access) {
        const response = await axiosService.post('auth/key/validate/', {token: access}).then(res => res.status);
        return response === 200;
    } else {
        return false;
    }
};

