import { DUNE_API_URL } from './constants';

export default {
	async queryById({ queryId, apiKey }) {
		const url = `${DUNE_API_URL}/query/${queryId}/results`;
		const res = await fetch(url, {
			headers: {
				'x-dune-api-key': apiKey,
			},
		});
		return res;
	},
};
