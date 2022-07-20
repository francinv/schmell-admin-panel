import { authService } from "../services/axiosService";

export const checkIfUserIsLoggedIn = async () => {
    const access = localStorage.getItem('access');
    if (access) {
        console.log(access);
        const response = await authService.post('key/validate/', {token: access}).then(res => res.status);
        return response === 200;
    } else {
        return false;
    }
};

