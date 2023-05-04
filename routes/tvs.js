const express = require("express");
const { validateTv, TvModel } = require("../model/tvModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {
    
  const perPage = req.query.perPage ? Math.min(req.query.perPage,6) : 5;
  const page = req.query.page - 1 || 0;
  const sort = req.query.sort || "_id";
  const reverse = req.query.reverse == "yes" ? 1 : -1;
  const data = await TvModel.find({})
    .limit(perPage)
    .skip(page * perPage)
    .sort({ [sort]: reverse });
  res.json(data);
});

router.get("/views",async(req,res)=>{
    const min = req.query.min || 0
    const max = req.query.max || Infinity
    try{
        const data = await TvModel
        .find({views:{$gte:min,$lte:max}})
        res.json(data)
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }

})

router.post("/", auth, async (req, res) => {
  const validBody = validateTv(req.body);
  if (validBody.error) {
    return res.status(401).json(validBody.error.details);
  }
  try {
    const tv = new TvModel(req.body);
    tv.user_id = req.tokenData._id;
    await tv.save();
    res.json(tv);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await TvModel.deleteOne({
      _id: id,
      user_id: req.tokenData._id,
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
router.put("/:id", auth, async (req, res) => {
  const validBody = validateTv(req.body);
  if (validBody.error) {
    return res.status(401).json(validBody.error.details);
  }
  try {
    const id = req.params.id;
    const data = await TvModel.updateOne(
      { _id: id, user_id: req.tokenData._id },
      req.body
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
