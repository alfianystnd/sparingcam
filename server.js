const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const CAMERA_TARGET = process.env.CAMERA_TARGET || 'http://103.245.39.218:8080';

app.use(
  '/808gps',
  createProxyMiddleware({
    target: `${CAMERA_TARGET}/808gps`,
    changeOrigin: true,
    ws: true,
    secure: false,
    pathRewrite: {
      '^/808gps': ''
    },
    logLevel: 'warn'
  })
);

app.use(
  '/js',
  createProxyMiddleware({
    target: `${CAMERA_TARGET}/js`,
    changeOrigin: true,
    ws: true,
    secure: false,
    pathRewrite: {
      '^/js': ''
    },
    logLevel: 'warn'
  })
);

app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Sparing Cam web+proxy running on http://localhost:${PORT}`);
  console.log(`Proxy target: ${CAMERA_TARGET}`);
});
