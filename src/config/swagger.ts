import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GuruSpot API',
      version: '1.0.0',
      description: 'API Documentation for GuruSpot Backend',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Paste your Supabase JWT here. DO NOT include "Bearer " in the input box, Swagger adds it automatically.',
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);
