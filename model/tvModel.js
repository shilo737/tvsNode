const mongoose = require("mongoose");
const Joi = require("joi");

const tvSchema = new mongoose.Schema(
  {
    name: String,
    genere: String,
    kind: String,
    views: Number,
    season:Number,
    image: String,
    descrption: String,
    user_id: String,
  },
  { timestamps: true }
);

exports.TvModel = mongoose.model("tv", tvSchema);

exports.validateTv = (_bodyData) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    genere: Joi.string().min(2).max(100).required(),
    kind: Joi.string().min(2).max(800).required(),
    views: Joi.number().min(1).max(Infinity).required(),
    season: Joi.number().min(1).max(Infinity).required(),
    image: Joi.string().min(2).max(800).required(),
    descrption: Joi.string().min(2).max(800).required(),
  });
  return joiSchema.validate(_bodyData);
};
