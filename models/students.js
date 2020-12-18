var mongoose = require('mongoose');





var studentschema = new mongoose.Schema({
  name : { type : String, required : true },
  lastName : { type : String, required : true },

  group:{type: Number,required : true,min :1,max:6 }
});




/* exports */
const dbConnection = require('../controllers/db');
var students = dbConnection.model('student',studentschema,'students');

module.exports.schema = studentschema;
module.exports.model = students;
