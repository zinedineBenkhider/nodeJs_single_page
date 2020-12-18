
import {annuler,updateStudent,deleteStudent,findByGroupe,findByName,createStudent,countStudentsOfEachGroupe} from './students.js';
require("../stylesheets/style.css");
var setupListeners =
  () => {
    let annulerBoutons = document.getElementsByClassName("annuler");
     Array.from(annulerBoutons).forEach( button => button.addEventListener('click',()=> annuler(JSON.parse(button.dataset.student))));
    let updates = document.getElementsByClassName("put");
   Array.from(updates).forEach( button => button.addEventListener('click', () => updateStudent(button.dataset.studentid)));
    let deletes = document.getElementsByClassName("delete");

    Array.from(deletes).forEach( button => button.addEventListener('click', () => deleteStudent(button.dataset.studentid, button)));

    let searchByGroupe=document.getElementById("searchByGroupe");
    let recherche=document.getElementById("recherche");

  searchByGroupe.addEventListener('click', () => findByGroupe(recherche.value));
     let searchByName=document.getElementById("searchByName");
     let nameInputed=document.getElementById("nameInputed");
    searchByName.addEventListener('click', () => findByName(nameInputed.value));

    post.addEventListener('click', createStudent);
   countStudentsOfEachGroupe();

  }

window.addEventListener('load', setupListeners);
