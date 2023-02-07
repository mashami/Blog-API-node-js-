const LogInDoc = {
    tags: ["AUTHENTICATION"],
    description: "REGISTER AND LOG IN TO USER",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        email:{
                            type:"string",
                            example:"mashami@gmail.com"
                        },
                        password:{
                            type:"string",
                            example:"12345"
                        },
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "OK",

            content: {
                "application/json": {
                    Schema: {
                        type: "object",
                        example: {
                            count: 0,
                            user: [],
                        },
                    },
                },
            },
        },
    },
}
// localhost:5000/api/auth/login

const createUser={
    tags: ["AUTHENTICATION"],
    description: "REGISTER AND LOG IN TO USER",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        username:{
                            type:"string",
                            example:"mashami"
                        },
                        email:{
                            type:"string",
                            example:"mashami@gmail.com"
                        },
                        password:{
                            type:"string",
                            example:"12345"
                        },
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "OK",

            content: {
                "application/json": {
                    Schema: {
                        type: "object",
                        example: {
                            count: 0,
                            user: [],
                        },
                    },
                },
            },
        },
    },
}

// const getUser={
//     tags: ["USER"],
//     description: "REGISTER AND LOG IN TO USER",
//     responses: {
//         200: {
//             description: "OK",

//             content: {
//                 "application/json": {
//                     Schema: {
//                         type: "object",
//                         example: {
//                             count: 0,
//                             user: [],
//                         },
//                     },
//                 },
//             },
//         },
//     },
// }

const userRegDoc= {
    "/api/auth/register":{
        post:createUser
    },
    "/api/auth/login":{
        post:LogInDoc
    },
};

module.exports = userRegDoc;
