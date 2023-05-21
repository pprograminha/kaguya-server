export type HttpResponse = {
  statusCode: number;
  body: {
    errors: Error[];
    data: any;
  };
};

export const ok = <T>(dto?: T): HttpResponse => {
  return {
    statusCode: 200,
    body: {
      errors: [],
      data: dto,
    },
  };
};

const getErrors = (errorOrErrors: Error[] | Error) =>
  (Array.isArray(errorOrErrors) ? errorOrErrors : [errorOrErrors]).map(
    error => ({
      name: error.name,
      message: error.message,
    }),
  );

export const badRequest = (errorOrErrors: Error[] | Error): HttpResponse => {
  const errors = getErrors(errorOrErrors);

  return {
    statusCode: 400,
    body: {
      errors,
      data: null,
    },
  };
};
