const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://3.34.4.68:8080',
      changeOrigin: true,
    })
  );

  app.use(
    '/stream',
    createProxyMiddleware({
      target: 'https://connectedplatform.s3.ap-northeast-2.amazonaws.com', // 두 번째 스트리밍 서버
      changeOrigin: true,
      pathRewrite: {
        '^/stream': '', // /stream 경로를 제거하고 요청을 스트리밍 서버로 보냄
      },
    })
  );
};