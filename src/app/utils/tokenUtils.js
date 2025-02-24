export const decodeToken = (token) => {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		return JSON.parse(atob(base64));
	} catch (err) {
		console.error("Invalid token format", err);
		return null;
	}
};

export const isTokenExpired = (decodedToken) => {
	const currentTime = Math.floor(Date.now() / 1000);
	return decodedToken?.exp < currentTime;
};

export const getRoleFromToken = (decodedToken) => {
	return decodedToken?.role;
};
