const GetPost = {
    tags: ["POST"],
    description: "POST",
    description: "Get the post by id",
    security:[{
        token :[]
    }],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "id of user",
            type: "string",
            example: "63e9227fc807f6e9217d955a"
        }
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    type: 'object',
                    example: {
                        status: "success",
                        data: []
                    },
                },
            },
        },
    },

};

const DeletePost = {
    
        tags: ['POST'],
        description: "Delete POST by id",
        security:[{
            token :[]
        }],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "id of POST",
                type: "string",
                example: "63caaf3527b29e1d399896da"
            }
        ],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                         
                            username: {
                                type: "string",
                                example: "mashami"
    
                            },
                            
                        },
                    },
                },
            },
        },
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        type: "object",
                        example: {
                            status: "success",
                            data: []
                        },
                    },
                },
            },
        },
    };



const updatePostById = {
    tags: ['POST'],
    description: "Update POST by id",
    security:[{
        token :[]
    }],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "id of POST",
            type: "string",
            example: "63caaf3527b29e1d399896da"
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        // userId: {
                        //     type: "string",
                        //     description: "copy is past her",
                        //     example: "63caaf3527b29e1d399896da"

                        // },
                        title: {
                            type: "string",
                            example: "first post"
                        },
                        desc: {
                            type: "string",
                            example: "This post it all about ..."
                        },

                        username: {
                            type: "string",
                            example: "mashami"

                        },
                        categories: {
                            type: "string",
                            example: "music"
                        }
                    },
                },
            },
        },
    },
    responses: {
        201: {
            description: "OK",
            content: {
                "application/json": {
                    type: "object",
                    example: {
                        status: "success",
                        data: []
                    },
                },
            },
        },
    },
};


const createPost = {
    tags: ["POST"],
    description: "REGISTER AND LOG IN TO USER",
    security:[{
        token :[]
    }],
    requestBody: {
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            example: "first post"
                        },
                        desc: {
                            type: "string",
                            example: "This post it all about ..."
                        },
                        photo: {
                            type: "file",
                            example: "upload Image"
                        },
                        categories: {
                            type: "string",
                            example: "music"
                        }
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








const GetAllPost = {
    tags: ["POST"],
    description: "ALL POST",
    security:[{
        token :[]
    }],
    // parameters: [
    //     {
    //         name: "username",
    //         in: "path",
    //         description: "user name of a user",
    //         type: "string",
    //         example: "paccy"
    //     }
    // ],
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


const GetAllPostExits = {
    tags: ["POST"],
    description: "ALL POST",
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


const updateLikesById = {
    tags: ['POST'],
    description: "Update POST by id",
    security:[{
        token :[]
    }],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "id of POST",
            type: "string",
            example: "63d927c84508ed237816d5cc"
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    
                },
            },
        },
    },
    responses: {
        201: {
            description: "OK",
            content: {
                "application/json": {
                    type: "object",
                    example: {
                        status: "success",
                        data: []
                    },
                },
            },
        },
    },
};


const PostDoc = {
   
    "/api/post/{id}": {
        get: GetPost
    },
    "/api/post/delete/{id}":{
        delete: DeletePost
    },
    "/api/post/update/{id}":{
        put:updatePostById
    },
    "/api/post?username={username}": {
        get: GetAllPost
    },
    "/api/post/create": {
        post: createPost
    },
    "/api/post/likes/{id}":{
        put: updateLikesById
    
    },
    "/api/post/all":{
        get: GetAllPostExits
    },
    
};

module.exports = PostDoc;
