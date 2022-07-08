import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app:any) {
	app.use(
		[
			'/kpiBusiness',
			'/api',
			'/logout',
			'/login',
			'/private',
			'/oauth2/authorization/kpi-back',
			'/login/oauth2/code/kpi-back',
			'/token',
			'/business/api',
			'/api/user',
			'/admin/management/users',
			
		],
		createProxyMiddleware({
			target:  'http://localhost:8090',
			secure: false,
			changeOrigin: true,
			// xfwd: true,
			// 'http://kpi.dev.app.royalairmaroc.com:8090',
			// http://localhost:8090
		})
	);
};
