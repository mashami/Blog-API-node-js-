
const createComment={
    tags: ["COMEMENT"],
    description: " COMEMENT",

   
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
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        Comment:{
                            type:"string",
                            example:"nice post"
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



// const GetAllCategory={
//     tags: ["CATEGORY"],
//     description: "ALL CATEGORY",
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

const commentDoc = {
   
   "/api/comment/create/{id}":{
    post:createComment,
    
   },
    
   

};

module.exports = commentDoc
    ;
