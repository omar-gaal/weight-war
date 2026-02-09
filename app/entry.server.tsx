import type { EntryContext } from "react-router";
import { renderToString } from "react-dom/server";
import { ServerRouter } from "react-router";

export default function handleRequest(
  request: Request,
  statusCode: number,
  headers: Headers,
  context: EntryContext
) {
  const html = renderToString(
    <ServerRouter context={context} url={request.url} />
  );

  headers.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + html, {
    status: statusCode,
    headers,
  });
}
