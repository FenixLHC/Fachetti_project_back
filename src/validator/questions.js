const {body, param, query} = require('express-validator')
const { validateResult, validateImage, validateName, validatePassword, validateDescription } = require('../utils/validateHelper')

const validateQuestionCreate = [
    body('name')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Must have a name')
        .bail()
        .custom(value => validateName(value))
        .bail(),
    body('email')
        .exists()
        .not()
        .isEmpty()
        .toLowerCase()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email')
        .bail(),
    body('message')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .custom( value => validateDescription(value,'message'))
        .bail(),
    body('phone')
        .optional()
        .isString()
        .custom( value => validateDescription(value,'phone'))
        .bail(),
    (req,res,next)=>{
        validateResult(req,res,next)
    }
]

const validateQuestionUpdate = [
    param('id')
        .exists()
        .not()
        .isEmpty()
        .isUUID()
        .bail(),
    query('answered')
        .optional()
        .isBoolean()
        .bail(),
    query('readed')
        .optional()
        .isBoolean()
        .bail(),
    (req,res,next)=>{
        validateResult(req,res,next)
    }
]
module.exports = {
    validateQuestionCreate,
    validateQuestionUpdate
}