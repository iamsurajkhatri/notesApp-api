// swaggerOptions.js
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Notes App API',
        version: '1.0.0',
        description: 'API documentation for the Notes App',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local development server',
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to the API routes
  };  
module.exports = swaggerOptions;
  