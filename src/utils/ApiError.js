class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.success = false; // Always false for errors
    this.errors = errors.length ? errors : null; // Optional extra info
    this.data = null; // Reserved for consistency with ApiResponse

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
