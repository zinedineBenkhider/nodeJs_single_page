var Students = require('../models/students').model;

var home =
  (req,res) =>
        Students.find()
             .then( allstudents => res.render('students',
                                           { name : 'Students',
                                             students : allstudents } ) );

var getStudent =
  (req,res) =>
    Students.findById( req.params.studentId )
         .then( student => res.status(200).json(student) );
var groupe =
  (req, res) =>
      Students.find({group :req.params.groupe })
      .then( students => res.status(200).json(students));

var searchByName =
   (req, res) =>

        Students.find( {lastName: { $regex: req.params.name,$options:"$i"}} )
        .then( students => res.status(200).json(students));



var createNewStudent =
  (req,res) => {
    "use strict";
    let newStudent = { name : req.body.name, lastName : req.body.lastName, group : req.body.group };
    Students.create(newStudent)
         .then( student => res.status(200).json(student) );
  }

  var updateStudent=
    (req,res) => {
      "use strict";
      let updatedStudent = { name : req.body.name, lastName : req.body.lastName, group : req.body.group};
      Students.findByIdAndUpdate( req.params.studentId, updatedStudent, { new : true } )
        .then( student => res.status(200).json(student) );


    }



var deleteStudent =
  (req,res) =>
      Students.findByIdAndRemove( req.params.studentId )
           .then( () => res.status(200).end() );

var countGroupe1=
        (req, res) =>
            Students.find({group :1})
                .then( student=> res.status(200).json(student));
var countGroupe2=
        (req, res) =>
             Students.find({group :2})
                .then( student=> res.status(200).json(student));
var countGroupe3=
          (req, res) =>
            Students.find({group :3})
                .then( student=> res.status(200).json(student));
var countGroupe4=
          (req, res) =>
            Students.find({group :4})
                .then( student=> res.status(200).json(student));

var countGroupe5=
          (req, res) =>
              Students.find({group :5})
                .then( student=> res.status(200).json(student));
var countGroupe6=
          (req, res) =>
                Students.find({group :6})
                  .then( student=> res.status(200).json(student));

module.exports.countGroupe1=countGroupe1;
module.exports.countGroupe2=countGroupe2;
module.exports.countGroupe3=countGroupe3;
module.exports.countGroupe4=countGroupe4;
module.exports.countGroupe5=countGroupe5;
module.exports.countGroupe6=countGroupe6;

module.exports.searchByName=searchByName;
module.exports.groupe=groupe;
module.exports.home = home;
module.exports.getStudent = getStudent;
module.exports.createNewStudent = createNewStudent;
module.exports.updateStudent = updateStudent;
module.exports.deleteStudent = deleteStudent;
