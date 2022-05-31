const notFound = {
  status: 404,
  text: "Not Found",
};

const internalServerError = {
  status: 500,
  text: "Internal Server Error",
};

const ok = {
  status: 200,
  text: "OK",
};

function notFoundResponse({
  body = notFound.text,
  status = notFound.status,
  statusText = notFound.text,
} = {}) {
  return new Response(body, {
    status,
    statusText,
  });
}

function internalServerErrorResponse({
  body = internalServerError.text,
  status = internalServerError.status,
  statusText = internalServerError.text,
} = {}) {
  return new Response(body, {
    status,
    statusText,
  });
}

function okResponse({
  body = ok.text,
  options = {},
} = {}) {
  return new Response(body, options);
}

export { internalServerErrorResponse, notFoundResponse, okResponse };
