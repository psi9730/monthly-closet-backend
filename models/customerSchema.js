const Joi = require('joi');

const name = Joi.string().regex(/^[A-Z]+$/);
const personDataSchema = Joi.object().keys({
  name: name.required(),
  email: Joi.string().email(),
  cafe24_id: Joi.string(),
  birth_date: Joi.date().iso(),
  phone: Joi.string().regex(/^((\+\d{1,2}|1)[\s.-]?)?\(?[2-9](?!11)\d{2}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}$/),
  sex: Joi.number().integer().positive(), // 0: 여성, 1: 남성
});


exports.personDataSchema = personDataSchema;
