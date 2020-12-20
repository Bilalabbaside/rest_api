const joi = require('@hapi/joi');

const registerValidation = (data) =>{
    const schema = {
        name: joi.string().min(6).required(),
        email:joi.string().min().required().email(),
        cnic:joi.string().min(13).required().max(13),
        password:joi.string().min(8).required(),
        district:joi.string().min(4).required(),
        city:joi.string().min(4).required(),
    };
    // const error= schema.validate(req);
    // console.log(error.details[0].message);
    // return {error};//
    console.log(joi.validate(data,schema));
}
// const loginValidation = data =>{
    
//     const schema = {
//         email:joi.string().min().required().email(),
//         password:joi.string().min(8).required(),
//     };
//     return joi.validate(data,schema);
// }
module.exports.registerValidation=registerValidation;
//module.exports.loginValidation=loginValidation;