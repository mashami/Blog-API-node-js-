const GetUser = {
    tags: ["USER"],
    description: "USER",
    description: "this API id for Getting the user by id, this task is for owner and Admin only",
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
    description: "This API is for deleting a user, this task it for the Admin only",
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
    description:"This API is for Updating a user by id, this task is for owner and admin only",
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
            "multipart/form-data":{
                schema:{
                    type:"object",
                    properties:{
                        
                        email:{
                            type:"string",
                            description:"Your email",
                            // example:"kaleb@gmail.com"
                        },
                        password:{
                            type:"string",
                            description:"your password",
                            // example:"12345"
                        },
                        username:{
                            type:"string",
                            description:"update a user name",
                            // example:"mashami"
                        },
                        profilePicture: {
                            type: "file",
                            example: "upload Image"
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
    description: "this API is for the getting all users but will be done by Admin only",
    security:[{
        token :[]
    }],
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
        patch:updateUserById
    },
    "/api/user/":{
        get:GetAllUser
    },

};

module.exports = userDoc;
