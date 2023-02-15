const createRealState = {
    tags: ["REAL_STATE"],
    description: "This API is for creating a post which will be for the people who have an account",
    // security:[{
    //     token :[]
    // }],
    requestBody: {
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
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
                        Description:{
                           type: "String",
                           example:"This is house for sell"
                           
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

const realStateDoc = {
   
    "/api/realstate/create": {
        post: createRealState
    }
}

module.exports = realStateDoc;