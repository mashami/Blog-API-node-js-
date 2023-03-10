const GetArealState = {
    tags: ["REAL_STATE"],
    description: "REAL_STATE",
    description: "This Api generated for accessing a Post only by the post owner by using ID of the post",
    
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


const createRealState = {
    tags: ["REAL_STATE"],
    description: "This API is for creating a post which will be for the people who have an account",
    security:[{
        token :[]
    }],
    requestBody: {
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        title:{
                            type:"String",
                            example:"title"
                         },
                        'location[province]':{
                            type:"String",
                            example:"Kigali",
                        },
                        
                        'location[district]':{
                            type:"String",
                            example:"Nyarugenge",
                        },
                        'location[street]':{
                            type:"String",
                            example:"Nyamirambo",
                        },
                        
                        price: {
                            type: "String",
                            example: "3000"
                        },
                        image: {
                            type: "file",
                            example: "upload Image"
                        },
                        beds:{
                            type:"Number",
                           
                            example: "70"
                        },
                        bath:{
                            type: "Number",
                            example: "30"

                        },
                        yearbuilt:{
                            type: "Date",
                            example: "12/03/2023"

                        },
                        lotsize:{
                            type:"Number",
                            example:"12"
                        },
                        Status:{
                            type:"String",
                            example:"Sell"

                        },
                        offerBy:{
                            type:"String",
                            example:"paccy"
                        },
                        SqFt:{
                            type:"Number",
                            example:"343"
                        },
                        profilePicture:{
                            type: "file",
                            example: "upload Image"
                        },

                        Description:{
                           type: "String",
                           example:"This is house for sell"
                           
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

const GetAllrealStatesExits = {
    tags: ["REAL_STATE"],
    description: "this API it for getting all the posts exits in database no need of log in!",
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

const updateRealStateById = {
    tags: ['REAL_STATE'],
    description: "Update real State API it require you to generation a realState-Id but will be for and Admin",
    security:[{
        token :[]
    }],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "id of POST",
            type: "string",
            example: "63ec97261d70d08b58789481"
        }
    ],
    requestBody: {
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        title:{
                           type:"String",
                           example:"title"
                        },
                        'location[province]':{
                            type:"String",
                            example:"Kigali",
                        },
                        
                        'location[district]':{
                            type:"String",
                            example:"Nyarugenge",
                        },
                        'location[street]':{
                            type:"String",
                            example:"Nyamirambo",
                        },
                        
                        price: {
                            type: "String",
                            example: "3000"
                        },
                        image: {
                            type: "file",
                            example: "upload Image"
                        },
                        beds:{
                            type:"Number",
                           
                            example: "70"
                        },
                        bath:{
                            type: "Number",
                            example: "30"

                        },
                        yearbuilt:{
                            type: "Date",
                            example: "12/03/2023"

                        },
                        lotsize:{
                            type:"Number",
                            example:"12"
                        },
                        Status:{
                            type:"String",
                            example:"Sell"

                        },
                        offerBy:{
                            type:"String",
                            example:"paccy"
                        },
                        SqFt:{
                            type:"Number",
                            example:"343"
                        },
                        profilePicture:{
                            type: "file",
                            example: "upload Image"
                        },

                        Description:{
                           type: "String",
                           example:"This is house for sell"
                        },
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

const DeleteRealState = {
    
    tags: ['REAL_STATE'],
    description: "Delete POST by id",
    description: "this API is for deleting a post but task for the owner of the post and admin",
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


const updateLikesById = {
    tags: ['REAL_STATE'],
    description: "this is the API for the like a user will be allow to like post a once",
    
    parameters: [
        {
            name: "id",
            in: "path",
            description: "id of POST",
            type: "string",
            example: "63ef1e2c8376bdb27617b0a9"
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



const updateviewsById = {
    tags: ['REAL_STATE'],
    description: "this is the API for the views a user will be allow to view",
    
    parameters: [
        {
            name: "id",
            in: "path",
            description: "id of POST",
            type: "string",
            example: "63ef1e2c8376bdb27617b0a9"
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

const realStateDoc = {
    "/api/realstate/{id}":{
         get:GetArealState
    },
    "/api/realstate/create": {
        post: createRealState
    },
    "/api/realstate/all":{
        get: GetAllrealStatesExits
    },
    "/api/realstate/update/{id}": {
        patch: updateRealStateById
    },
    "/api/realstate/likes/{id}":{
        patch :updateLikesById
    },
    "/api/realstate/views/{id}":{
        patch:updateviewsById
    },
    "/api/realstate/delete/{id}":{
        delete: DeleteRealState
    },
}

module.exports = realStateDoc;