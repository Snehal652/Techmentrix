// await schema.parseAsync(req.body) is the line where you use ZOD to validate the request body data against the defined schema.
//This is basically our middleware which is checking ki user ne jo data bheja hai woh schema se match karta hai ya nhi.
const validate = (schema) => async(req,res,next) => {
    try {
        const parseBody = await schema.parseAsync(req.body); //This is used to check ki user ne jo details bhari hai kya woh humaare schema se match karta hai ya nhi. If match karta hai then req.body ko parse.body ke equal kardo and next() call kardo. 
        req.body = parseBody;
        next();
        
    } catch (err) {
        // const message = err.errors[0].message;
        // console.log(message);
        // res.status(400).json({msg:message});
        const status = 422;
        const message = 'Fill the Input properly';
        const extraDetails = err.errors[0].message;

        const error = {
            status, 
            message,
            extraDetails,
        } //This will be passed as an object to error middleware

        console.log(error);
        next(error);
    }
};

module.exports = validate;