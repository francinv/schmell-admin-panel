import axios from "axios";

const baseURL = 'api/';

const axiosService = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
		Authorization: localStorage.getItem('access')
			? 'Bearer ' + localStorage.getItem('access')
			: null,
		accept: 'application/json',
	}, 
});

axiosService.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'auth/refresh/'
		) {
			alert(
				'A server/network error occurred. ' +
					'Please log-out.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axiosService
						.post('auth/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access', response.data.access);

							axiosService.defaults.headers['Authorization'] =
								'Bearer ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'Bearer ' + response.data.access;

							return axiosService(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					alert('Your token has expired. ' +
                            'Please log-out.');
				}
			} else {
				console.log('Refresh token not available.');
				alert('Your token is not available. ' +
                            'Please log-out.');
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosService;