export const Ok = (message: string) => (data: unknown) => {
  return new Response(
    JSON.stringify({
      message: message || "",
      data: data || {},
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

export const BadRequestError = (message: string) => (data: unknown) => {
  return new Response(
    JSON.stringify({
      message: message || "",
      data: data || {},
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
};

export const ValidationError = (message: string) => (data: unknown) => {
  return new Response(
    JSON.stringify({
      message: message || "",
      data: data || {},
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
};

export const UnAuthorisationError = (message: string) => (data: unknown) => {
  return new Response(
    JSON.stringify({
      message: message || "",
      data: data || {},
    }),
    { status: 403, headers: { "Content-Type": "application/json" } }
  );
};
