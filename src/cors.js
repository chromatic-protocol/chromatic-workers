function withCors(request, response, allowedOrigins) {
	const allowedOriginList = Object.values(JSON.parse(allowedOrigins));

	const origin = request.headers.get('origin');

	const allowedOrigin = allowedOriginList.find((allowedOrigin) => origin.includes(allowedOrigin)) ? origin : 'https://chromatic.finance';

	const corsHeaders = {
		'Access-Control-Allow-Origin': allowedOrigin,
	};

	return {
		...response,
		headers: {
			...response.headers,
			...corsHeaders,
		},
	};
}

export { withCors };
