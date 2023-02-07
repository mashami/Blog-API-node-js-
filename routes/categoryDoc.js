
const createCategory={
    tags: ["CATEGORY"],
    description: "REGISTER CATEGORY",
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
    description: "ALL CATEGORY",
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
