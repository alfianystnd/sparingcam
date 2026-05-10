exports.handler = async (event) => {
  try {
    const base = process.env.CAMERA_TARGET || 'http://103.245.39.218:8080';
    const marker = '/.netlify/functions/cam/';
    const idx = event.path.indexOf(marker);

    if (idx < 0) {
      return {
        statusCode: 400,
        body: 'Invalid proxy path'
      };
    }

    const rawPath = event.path.slice(idx + marker.length);
    const targetUrl = `${base}/${rawPath}${event.rawQuery ? `?${event.rawQuery}` : ''}`;

    const headers = { ...event.headers };
    delete headers.host;
    delete headers['x-forwarded-for'];
    delete headers['x-forwarded-host'];
    delete headers['x-forwarded-port'];
    delete headers['x-forwarded-proto'];

    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers,
      body: ['GET', 'HEAD'].includes(event.httpMethod)
        ? undefined
        : (event.isBase64Encoded ? Buffer.from(event.body || '', 'base64') : event.body)
    });

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'content-length') return;
      responseHeaders[key] = value;
    });

    return {
      statusCode: response.status,
      headers: responseHeaders,
      body: buffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    return {
      statusCode: 502,
      body: `Proxy error: ${error.message}`
    };
  }
};
