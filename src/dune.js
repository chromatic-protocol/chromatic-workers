const apiUrl = 'https://api.dune.com/api/v1';

export default {
	async queryById({ queryId, apiKey }) {
		const url = `${apiUrl}/query/${queryId}/results`;
		const res = await fetch(url, {
			headers: {
				'x-dune-api-key': apiKey,
			},
		});
		return res;
	},
};
