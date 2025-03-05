const { abort } = require("process");

module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // This includes all the errors
        allowUnknown: true, // This allows the schema to ignore any unknown keys
        stripUnknown: true // This removes any unknown keys from the request data
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}