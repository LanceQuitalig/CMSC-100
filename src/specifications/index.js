export const specification = {
  openapi: '3.0.0',
  info: {
    title: 'ToDo App',
    version: '0.0.1'
  },
  paths: {
    '/': {
      get: {
        summary: 'API General Example',
        responses: {
          200: {
            description: 'successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
