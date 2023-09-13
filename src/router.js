import dune from './dune';
import { withCors } from './cors';

class Router {
	routes = [];

	handle(request, env) {
		for (const route of this.routes) {
			const match = route[0](request);
			if (match) {
				return route[1]({ ...match, request, env });
			}
		}
		const match = this.routes.find(([matcher]) => matcher(request));
		if (match) {
			return match[1]({ ...request, env });
		}
	}

	register(handler, path, method) {
		const urlPattern = new URLPattern({ pathname: path });
		this.routes.push([
			(request) => {
				if (method === undefined || request.method.toLowerCase() === method) {
					const match = urlPattern.exec({
						pathname: new URL(request.url).pathname,
					});
					if (match) {
						return { params: match.pathname.groups };
					}
				}
			},
			(args) => handler(args),
		]);
	}

	get(path, handler) {
		this.register(handler, path, 'get');
	}
	post(path, handler) {
		this.register(handler, path, 'post');
	}

	all(path, handler) {
		this.register(handler, path);
	}
}

const router = new Router();

router.get('/dune/:queryId', async ({ params, env, request }) => {
	const response = await dune.queryById({
		queryId: params.queryId,
		apiKey: env.DUNE_API_KEY,
	});
	return new Response(response.body, withCors(request, response, env.ALLOWED_ORIGINS));
});

router.get('/dune', async ({ env }) => {
	return new Response(env.DUNE_API_KEY);
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
