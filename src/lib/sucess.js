export function success(status, message, data) {
  return {
    status,
    message,
    data,
  };
}

export function error(status, message) {
  return {
    status,
    message,
  };
}
