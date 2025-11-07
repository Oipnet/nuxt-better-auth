import { readRawBody, setResponseHeader, setResponseStatus, getRequestURL, type H3Event } from 'h3';
import { auth } from '~/lib/auth';

async function toWebRequest(event: H3Event) {
  const url = getRequestURL(event);
  const method = event.node.req.method || 'GET';
  const headers = new Headers();

  for (const [key, value] of Object.entries(event.node.req.headers)) {
    if (value === undefined) {
      continue;
    }
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (entry !== undefined) {
          headers.append(key, entry);
        }
      }
    } else {
      headers.append(key, value);
    }
  }

  const hasBody = !['GET', 'HEAD'].includes(method.toUpperCase());
  const rawBody = hasBody ? await readRawBody(event) : undefined;

  return new Request(url.toString(), {
    method,
    headers,
    body: rawBody === null ? undefined : (rawBody as BodyInit),
  });
}

export default defineEventHandler(async event => {
  const webRequest = await toWebRequest(event);
  const response = await auth.handler(webRequest);

  setResponseStatus(event, response.status);

  // Handle cookies separately so we keep multiple set-cookie headers intact.
  const setCookies = (response.headers as Headers & {
    getSetCookie?: () => string[];
  }).getSetCookie?.();
  if (setCookies && setCookies.length > 0) {
    event.node.res.setHeader('set-cookie', setCookies);
  }

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      return;
    }
    setResponseHeader(event, key, value);
  });

  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return await response.json();
  }

  if (contentType.startsWith('text/')) {
    return await response.text();
  }

  // Fallback for empty or binary responses.
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
});
