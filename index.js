var express = require('express');
var router = express.Router();
var empmodel = require('../modules/employee');
const employeemodel = require('../modules/employee');

/* GET home page. */
router.get('/', function(req, res, next) {
  // here we will fetch the data from the database and render it to the index.ejs file
  employeemodel.find({}).exec()
    .then(data => {
      res.render('index', { title: 'Employee Records', records: data });
    })
    .catch(err => {
      next(err);
    });
});

//we will create a post method here this will keep the page same only 
router.post("/", async function(req, res, next) {
  try {
    var empdetails = new employeemodel({
      name: req.body.name,
      email: req.body.email,
      type: req.body.type,
      hourly_rate: req.body.hourly_rate,
      total_hrs: req.body.total_hrs
    });

    await empdetails.save();

    const latestRecord = await empmodel.findOne({}).sort({ _id: -1 }).exec();
    res.render('index', { title: 'Employee Records', records: [latestRecord] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

