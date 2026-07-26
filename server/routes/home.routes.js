const express = require("express");
const router = express.Router();

//Home Validators
const validate = require("../middlewares/validate.middleware");
const homeSchemaValidation = require("../validators/home.validator");

const requireAuth = require('../middlewares/requireAuth.middleware');

// Home Controllers
const {
  getHomes,
  getHome,
  getMyHomes,
  updateHome,
  postHome,
  deleteHome,
} = require("../controllers/home.controller");


// Home Routes
router.get("/", getHomes);
router.get("/my", requireAuth, getMyHomes);

router.get("/:id", getHome);

router.post("/",requireAuth, validate(homeSchemaValidation), postHome);

router.put("/:id",requireAuth, validate(homeSchemaValidation), updateHome);

router.delete("/:id",requireAuth, deleteHome);

module.exports = router;
