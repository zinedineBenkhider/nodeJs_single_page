
var annuler=
    (student)=>{
      document.getElementById((student._id+"n")).value=student.name ;
      document.getElementById(student._id+"p").value=student.lastName;
      document.getElementById(student._id+"g").value=student.group;

}

var creatNewStudent=
    ()=>{

  let name=document.getElementById("nomcreat").value;
  let prenom=document.getElementById("prenomcreat").value;
  let groupe=document.getElementById("groupecreat").value;
  return  { name : name, lastName : prenom, group : groupe  };

}
var toUpdate=
    (id)=>{

  let name=document.getElementById((id+"n")).value;
  let prenom=document.getElementById((id+"p")).value;
  let groupe=document.getElementById((id+"g")).value;
  return  { name : name, lastName : prenom, group : groupe  };

}

var newTable=
  t=>{
    let tab=document.getElementById("table");

    let body=document.getElementsByTagName("body")[0];

  tab.parentNode.removeChild(tab);
  let table = document.createElement("table");
  table.className="studentslist";
  table.setAttribute("id","table");
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    let trinit= document.createElement("tr");
    trinit.className="book"
    let tdn = document.createElement("td");
    tdn.innerHTML="Name";
    let tdp = document.createElement("td");
    tdp.innerHTML="Last name";
    let tdg = document.createElement("td");
    tdg.innerHTML="Group";
    let tde = document.createElement("td");
    tde.innerHTML="Update";
    let tda = document.createElement("td");
    tda.innerHTML="Undo";
    let tds = document.createElement("td");
    tds.innerHTML="Delete";
    trinit.appendChild(tdn);
    trinit.appendChild(tdp);
    trinit.appendChild(tdg);
    trinit.appendChild(tde);
    trinit.appendChild(tda);
    trinit.appendChild(tds);
    tbody.appendChild(trinit);
for (let elem of t){
  let tr= document.createElement("tr");
let input1 = document.createElement("input");
input1.setAttribute("id",elem['_id']+"n");

let input2 = document.createElement("input");
input2.setAttribute("id",elem['_id']+"p");
let input3 = document.createElement("input");
input3.setAttribute("id",elem['_id']+"g");
let enregistrer = document.createElement("button");
enregistrer.setAttribute("data-studentid",elem['_id']);
enregistrer.innerHTML="enregistrer"
enregistrer.addEventListener('click', () => updateStudent(enregistrer.dataset.studentid));
let undo = document.createElement("button");
undo.setAttribute("data-student",JSON.stringify(elem));
undo.innerHTML="annuler";
undo.addEventListener('click',()=> annuler(JSON.parse(undo.dataset.student)));
let supprimer = document.createElement("button");

supprimer.setAttribute("data-studentid",elem['_id']);
supprimer.className="delete";
supprimer.innerHTML="supprimer";
supprimer.addEventListener('click', () => deleteStudent(supprimer.dataset.studentid, supprimer));
    input1.setAttribute("value",elem['name']);
    input1.setAttribute("placeholder","nom");
    input2.setAttribute("value",elem['lastName']);
    input2.setAttribute("placeholder","prenom");
    input3.setAttribute("value",elem['group']);
    input3.setAttribute("type","number");
    input3.setAttribute("step","1");
    input3.setAttribute("min","1");
    input3.setAttribute("max","6");
    input3.setAttribute("placeholder","groupe");
  let td1 = document.createElement("td");
  td1.className="name";
  let td2 = document.createElement("td");
  td2.className="lastName";
  let td3 = document.createElement("td");
  td3.className="group";
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");


  td1.appendChild(input1);
  td2.appendChild(input2);
  td3.appendChild(input3);
  td4.appendChild(enregistrer);
  td5.appendChild(undo);
  td6.appendChild(supprimer);

tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);
tr.appendChild(td4);
tr.appendChild(td5);
tr.appendChild(td6);
tr.className="book";
tr.setAttribute("data-groupe",elem['group']);
  tbody.appendChild(tr);

}

body.appendChild(table);


}
var getStudent =
    studentId => {

      let requestOptions = { method :'GET' };
      fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/${studentId}`, requestOptions)
        .then( response => response.json())
        .then( student => {details2.textContent = JSON.stringify(student);


  }

);

}

var findByGroupe =
    groupe => {

      let requestOptions = { method :'GET' };
      fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/groupe/${groupe}`, requestOptions)
        .then( response => response.json())
        .then( student => {

          newTable(student);
          clearTheInputFieldOfSearchByGroupe();
          

  });


}

var findByName =
    name => {

      let requestOptions = { method :'GET' };
      fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/name/${name}`, requestOptions)
        .then( response => response.json())

        .then( student => {

          newTable(student);
          clearTheInputFieldOfSearchByName();

  });


}
var clearTheInputFieldOfCreat=
    ()=>{
      document.getElementById("nomcreat").value="";
      document.getElementById("prenomcreat").value="";
      document.getElementById("groupecreat").value="";
}

var clearTheInputFieldOfSearchByName=
     ()=>{

document.getElementById("nameInputed").value="";

}
var clearTheInputFieldOfSearchByGroupe=
     ()=>{

document.getElementById("recherche").value="";

}
var updateStudent =


    studentId => {


              let newStudent = toUpdate(studentId);

              let body = JSON.stringify(newStudent);

              let requestOptions = { method :'PUT', headers : { "Content-Type": "application/json" }, body : body };
              fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/${studentId}`, requestOptions)
              .then( response => response.json())

              .then( () => window.setTimeout( () => window.location.reload(), 1000));


            }





var deleteStudent =
    (studentId, button) => {
    
      let requestOptions = { method :'DELETE' };
      fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/${studentId}`, requestOptions)

        .then ( () => {
          let span = document.createElement('span');
          span.className = 'deleted';
          span.textContent = 'deleted';
          button.parentNode.replaceChild( span , button);
        } )
        .then( () => window.setTimeout( () => window.location.reload(), 10));
    }


var createStudent =
    () => {

      let newBook=  creatNewStudent();
      let body = JSON.stringify(newBook);
      let requestOptions = { method :'POST',  headers : { "Content-Type": "application/json" }, body : body  };
      fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/`, requestOptions)
        .then( response => response.json() )

        .then( () => window.setTimeout( () => window.location.reload(), 10));
      clearTheInputFieldOfCreat();

    }




var countStudentsOfEachGroupe=
    ()=>{
      numberOfStudentsOfGroupeOne();
      numberOfStudentsOfGroupeTwo()
      numberOfStudentsOfGroupeTwo();
      numberOfStudentsOfGroupeThree();
      numberOfStudentsOfGroupeFour();
      numberOfStudentsOfGroupFeive();
      numberOfStudentsOfGroupeSix();
        }

var countStudentsOfOneGroupe=
    (list)=>{
    
    let count=0;
    for (let elem of list){
        count++;}
    return count;
                 }
var numberOfStudentsOfGroupeOne =
      () =>{

      let requestOptions = { method :'GET' };
      fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/groupe1/`, requestOptions)
        .then( response => response.json())
         .then( students => {
          groupe1.innerHTML=countStudentsOfOneGroupe(students);

      });


        }


var numberOfStudentsOfGroupeTwo =
      () =>{

      let requestOptions = { method :'GET' };
      fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/groupe2/`, requestOptions)
          .then( response => response.json())
          .then( students => {
            groupe2.innerHTML=countStudentsOfOneGroupe(students);

              });}

var numberOfStudentsOfGroupeThree =
      () =>{

      let requestOptions = { method :'GET' };
      fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/groupe3/`, requestOptions)
            .then( response => response.json())
            .then( students => {
            groupe3.innerHTML=countStudentsOfOneGroupe(students);

                  });}
var numberOfStudentsOfGroupeFour =
      () =>{

      let requestOptions = { method :'GET' };
      fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/groupe4/`, requestOptions)
            .then( response => response.json())
            .then( students => {
            groupe4.innerHTML=countStudentsOfOneGroupe(students);

                      });}
var numberOfStudentsOfGroupFeive =
      () =>{
      let requestOptions = { method :'GET' };
      fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/groupe5/`, requestOptions)
            .then( response => response.json())
            .then( students => {
            groupe5.innerHTML=countStudentsOfOneGroupe(students);

                  });}
var numberOfStudentsOfGroupeSix =
          () =>{

            let requestOptions = { method :'GET' };
            fetch(`https://zinedinebenkhidersinglepage.herokuapp.com/etudiants/groupe6/`, requestOptions)
            .then( response => response.json())
            .then( students => {
                groupe6.innerHTML=countStudentsOfOneGroupe(students);

                                    });}

export{annuler,updateStudent,deleteStudent,findByGroupe,findByName,createStudent,countStudentsOfEachGroupe}
