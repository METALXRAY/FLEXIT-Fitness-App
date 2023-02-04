export const exerciseOptions = {
	method: "GET",
	headers: {
		"X-Api-Key": "IwahRLXoKO+rY33Y0ZtrfQ==YMi6AQJSoYlw6izV",
	},
};

export const fetchData = async (url, options) => {
	const response = await fetch(url, options);
	const data = await response.json();
	return data;
};
