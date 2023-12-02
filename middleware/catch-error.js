export default function catchError(error, _, res, __) {
  res.status(error.status || 400).json({
    message: error.message || "Something is wrong",
  });
}
