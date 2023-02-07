const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const userRegDoc = require("../routes/auth.doc");
const userDoc = require("../routes/UserDoc");
const PostDoc = require("../routes/PostsDoc");
const categoryDoc=require("../routes/categoryDoc")

const options= {
    definition: {
        openapi: '3.0.0',
        info: {
          version: '1.0.0',
          title: 'Blogs Api',
          description: 'Blog api configurations',
        },
        servers: [
          {
            url: 'http://localhost:5000',
            description: 'Development server',
          },
          {
            url: 'https://mashami.cyclic.app',
            description: "Hosted Development server",
          },
        ],
        tags: [
          { name: 'AUTHENTICATION', description: 'Authentication Routes' },
          { name: 'USER', description: 'Users Routes' },
          { name: 'POST', description: 'Posts routes' },
          { name: 'CATEGORY', description: 'Category routes' },
        ],
       
        components: {
          securitySchemes: {
            token:{
              type:'apiKey',
              scheme:'bearer',
              bearerFormat:'JWT',
              name:'token',
              in:'header'

            },

          },

        },
        paths: {
            ...userRegDoc,
            ...userDoc,
            ...PostDoc,
            ...categoryDoc,
        },
      },
      apis: ['../routes/**/*.js'],

};

const swaggerSpec = swaggerJsDoc(options)

const swaggerDocumention = (app) =>{
    app.use("/swagger",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
}

module.exports =swaggerDocumention;