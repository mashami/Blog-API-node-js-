const GetUser = {
    tags: ["USER"],
    description: "USER",
    description: "Get the user by id",
    security:[{
        token :[]
    }],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "id of user",
            type: "string",
            example: "63caaf3527b29e1d399896da"
        }
    ],
    responses:{
        200:{
            description:"OK",
            content:{
                 "application/json":{
                    type:'object',
                    example:{
                        status:"success",
                        data:[]
                    },
                 },
            },
        },
    },
    
};

const DeleteUser = {
    tags: ["USER"],
    description: "USER",
    description: "Get the user by id",
    security:[{
        token :[]
    }],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "id of user",
            type: "string",
            example: "63caaf3527b29e1d399896da"
        }
    ],
    responses:{
        200:{
            description:"OK",
            content:{
                 "application/json":{
                    type:'object',
                    example:{
                        status:"success",
                        data:[]
                    },
                 },
            },
        },
    },
    
};


const updateUserById = {
    tags:['USER'],
    description:"Update user by id",
    security:[{
        token :[]
    }],
      parameters:[
        {
            name:"id",
            in:"path",
            description:"id of user",
            type:"string",
            example:"63caaf3527b29e1d399896da"
        }
    ],
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        
                        email:{
                            type:"string",
                            description:"Your email",
                            example:"kaleb@gmail.com"
                        },
                        password:{
                            type:"string",
                            description:"your password",
                            example:"12345"
                        },
                        username:{
                            type:"string",
                            description:"update a user name",
                            // example:"mashami"
                        },
                    },
                },
            },
        },
    },
    responses:{
        201:{
            description:"OK",
            content:{
                "application/json":{
                    type:"object",
                    example:{
                        status:"success",
                        data:[]
                    },
                },
            },
        },
    },
};
    


// localhost:5000/api/auth/login

// const createUser={
//     tags: ["AUTHENTICATION"],
//     description: "REGISTER AND LOG IN TO USER",
//     requestBody:{
//         content:{
//             "application/json":{
//                 schema:{
//                     type:"object",
//                     properties:{
//                         username:{
//                             type:"string",
//                             example:"mashami"
//                         },
//                         email:{
//                             type:"string",
//                             example:"mashami@gmail.com"
//                         },
//                         password:{
//                             type:"string",
//                             example:"12345"
//                         },
//                     }
//                 }
//             }
//         }
//     },
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



const GetAllUser={
    tags: ["USER"],
    description: "ALL USER",
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

const userDoc = {
    "/api/user/{id}": {
        get: GetUser
    },
    "/api/user/delete/{id}":{
        delete: DeleteUser
    },
    "/api/user/update/{id}":{
        put:updateUserById
    },
    "/api/user/":{
        get:GetAllUser
    },

};

module.exports = userDoc;
