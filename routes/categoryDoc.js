
const createCategory={
    tags: ["CATEGORY"],
    description: "REGISTER CATEGORY",
    description: "this is the API for creating Categories will be done by Admin only",
    security:[{
        token :[]
    }],
    
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        name:{
                            type:"string",
                            example:"category 1"
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



const GetAllCategory={
    tags: ["CATEGORY"],
    description: "GET ALL CATEGORY",
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

const categoryDoc = {
   
   "/api/category/create/":{
    post:createCategory
    
   },
    
    "/api/category/":{
        get:GetAllCategory
    },

};

module.exports = categoryDoc
    ;
