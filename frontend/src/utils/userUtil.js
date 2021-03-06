import axiosService from "../services/axiosService";

export const checkIfUserIsLoggedIn = async () => {
    const access = localStorage.getItem('access');
    if (access) {
        const res = await axiosService.post('auth/key/validate/', {token: access}).then(res => res.status);
        if (res === 200) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

