const Joi = require("joi");

const Joi_name = Joi.string().required();
const Joi_alias = Joi.string().alphanum().required();
const Joi_id = Joi.number().integer().min(1).required();

const addArticleCates_schume = {
  body: {
    name: Joi_name,
    alias: Joi_alias,
  },
};
const deleteArticleCates_schume = {
  params: {
    id: Joi_id,
  },
};

const updateArticleCateByid_schume = {
  body: {
    name: Joi_name,
    alias: Joi_alias,
    id: Joi_id,
  },
};
module.exports = {
  addArticleCates_schume,
  deleteArticleCates_schume,
  updateArticleCateByid_schume,
};
