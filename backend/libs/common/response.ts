export interface BaseResponse<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
}

// ✅ Reusable builder for success responses
function buildResponse<T>(
  data: T,
  message: string,
  statusCode: number,
): BaseResponse<T> {
  return {
    statusCode,
    message,
    data,
  };
}

// ✅ Reusable builder for no-data responses
function buildEmptyResponse(
  message: string,
  statusCode: number,
): BaseResponse<null> {
  return {
    statusCode,
    message,
    data: null,
  };
}

// ✅ Public API

export function success<T>(
  data: T,
  message = 'Success',
  statusCode = 200,
): BaseResponse<T> {
  return buildResponse(data, message, statusCode);
}

export function created<T>(
  data: T,
  message = 'Resource created',
  statusCode = 201,
): BaseResponse<T> {
  return buildResponse(data, message, statusCode);
}

export function noContent(
  message = 'No Content',
  statusCode = 204,
): BaseResponse<null> {
  return buildEmptyResponse(message, statusCode);
}

// ✅ Error variants — strongly typed to return BaseResponse<null>

export const error = (
  msg = 'Something went wrong',
  code = 500,
): BaseResponse<null> => buildEmptyResponse(msg, code);

export const notFound = (
  msg = 'Resource not found',
  code = 404,
): BaseResponse<null> => buildEmptyResponse(msg, code);

export const unauthorized = (
  msg = 'Unauthorized',
  code = 401,
): BaseResponse<null> => buildEmptyResponse(msg, code);

export const forbidden = (msg = 'Forbidden', code = 403): BaseResponse<null> =>
  buildEmptyResponse(msg, code);

export const badRequest = (
  msg = 'Bad Request',
  code = 400,
): BaseResponse<null> => buildEmptyResponse(msg, code);

export const conflict = (msg = 'Conflict', code = 409): BaseResponse<null> =>
  buildEmptyResponse(msg, code);

export const unprocessableEntity = (
  msg = 'Unprocessable Entity',
  code = 422,
): BaseResponse<null> => buildEmptyResponse(msg, code);

export const internalServerError = (
  msg = 'Internal Server Error',
  code = 500,
): BaseResponse<null> => buildEmptyResponse(msg, code);

export const serviceUnavailable = (
  msg = 'Service Unavailable',
  code = 503,
): BaseResponse<null> => buildEmptyResponse(msg, code);

export const gatewayTimeout = (
  msg = 'Gateway Timeout',
  code = 504,
): BaseResponse<null> => buildEmptyResponse(msg, code);

export const notImplemented = (
  msg = 'Not Implemented',
  code = 501,
): BaseResponse<null> => buildEmptyResponse(msg, code);

export const tooManyRequests = (
  msg = 'Too Many Requests',
  code = 429,
): BaseResponse<null> => buildEmptyResponse(msg, code);
