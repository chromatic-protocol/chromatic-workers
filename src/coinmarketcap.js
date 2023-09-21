import { CMC_API_URL } from './constants';

export default {
	async getInfo({ symbol, apiKey }) {
		const url = `${CMC_API_URL}/cryptocurrency/info?symbol=${symbol}`;
		const res = await fetch(url, {
			headers: {
				'X-CMC_PRO_API_KEY': apiKey,
			},
		});
		return res;
	},
};
