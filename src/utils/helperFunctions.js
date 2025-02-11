export function catchError(callback) {
  return async function (req, res, next) {
    try {
      await callback(req, res);
      next();
    } catch (e) {
      next(e);
    }
  };
}

export function createStatusError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export function getToken(req) {
  if (req.params.token) return req.params.token.trim();

  return (
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization?.split("Bearer").join("").trim()
  );
}