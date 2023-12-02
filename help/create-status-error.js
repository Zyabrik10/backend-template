export default function createStatusError(status, message) {
  const error = new Error(message);
  error.status = status;

  return error;
}
