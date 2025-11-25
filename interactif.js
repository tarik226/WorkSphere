const workers = [];
let count = 1;
function addWorker(e) {
    // prevention du sbmission du formulaire
  e.preventDefault();
//   recuperation des valeurs du formulaire
  let namevalue = document.getElementById("worker-name").value;
  let rolevalue = document.getElementById("worker-role").value;
  let photovalue = document.getElementById("worker-photo").value;
  let emailvalue = document.getElementById("worker-email").value;
  let numbervalue = document.getElementById("worker-number").value;
//   etablir le regex pour les tests des champs
// caras puis espace puis caras
  let regexname = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
//   le lien doit debuter par http et le s est optionnel suivi par des cara puis une point...
  let regexphoto = /^(https?:\/\/)?.+$/;
//   des cara puis @ puis . puis caras
  let regexemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   debtu par 06 puis autre 8 nombres
  let regexphone = /^06\d{8}$/;
  // let leaveDate= document.getElementsByClassName('experience_leavedate');
  // let hireDate=document.getElementsByClassName('experience_hiredate');
//   selection du parent qui comporte les exps==children
  let container = document.getElementsByClassName("experience-container")[0]
    .children;
    // taille des enfants==nombre des exps 
  let lengthe = document.getElementsByClassName("experience-container")[0]
    .children.length;
  // console.log('nombre d\'enfants'+lengthe);
//   selection du zone des erreurs
  let erreurs = document.getElementsByClassName("zone-erreur")[0];
//   vider les erreurs
erreurs.innerHTML = "";
// comparaison du date d'employement et date de demission 
  for (const exp of container) {
    if (
      new Date(exp.children[lengthe - 1]).getTime() >
      new Date(exp.children[lengthe - 2]).getTime()
    ) {
      console.log("inside the if");
      
      let erreur = document.createElement("p");
      erreur.innerHTML =
        "<strong>la date de recrutement ne doit etre inferieure a la date de demission</strong>";
      erreurs.appendChild(erreur);
    }
  }
  let table_exp = [];
  for (const element of container) {
    // recuperation des exps demploye et la creation d objet qui sera ajoutee a un tableau table_exp 
    console.log('inside the addworker');
    console.log(element);
    // recuperatin d u company role hireDate leaveDate
    let exp_company =element.querySelector(".experience_company").value;
    let exp_role = element.querySelector(".experience_role").value;
    let exp_hire = element.querySelector(".experience_hiredate").value;
    let exp_leave = element.querySelector(".experience_leavedate").value;
    // creation d objet 
    let objet_exp = {
      company: exp_company,
      role: exp_role,
      hireDate: exp_hire,
      leaveDate: exp_leave,
    };
    // ajout au table_exp
    table_exp.push(objet_exp);
  }
//   verification que tout les champs est comforme au regex
  if (
    regexname.test(namevalue) &&
    regexphoto.test(photovalue) &&
    regexemail.test(emailvalue) &&
    regexphone.test(numbervalue)
  ) {
    // si oui creation d objet worker_instance 
    // console.log("inside the if");
    let worker_instance = {
      id: count,
      name: namevalue,
      role: rolevalue,
      email: emailvalue,
      number: numbervalue,
      photo: photovalue,
      location: "none",
    //   exps sous formes du tableau des objets
      experiences: table_exp,
    };
    // ajout a workers
    workers.push(worker_instance);
    // incrementaion d id
    count++;
    // appel du workerRender qui affiche la liste maj
    workerRender("worker-list");
  } else {
    // si non affichage des erreurs dans la zone des erreurs selon qelle champs est incorrect
    console.log("inside the else");
    let erreurs = document.getElementsByClassName("zone-erreur")[0];
    if (!regexname.test(namevalue)) {
      console.log('inside the p');
      
      let erreur = document.createElement("p");
      erreur.innerHTML = "<strong>Nom invalide</strong>";
      erreurs.appendChild(erreur);
    }
    if (!regexphoto.test(photovalue)) {
            console.log('inside the img');

      let erreur = document.createElement("p");
      erreur.innerHTML = "<strong>Photo invalide (URL attendue)</strong>";
      erreurs.appendChild(erreur);
    }
    if (!regexemail.test(emailvalue)) {
            console.log('inside the email');

      let erreur = document.createElement("p");
      erreur.innerHTML = "<strong>Email invalide</strong>";
      erreurs.appendChild(erreur);
    }
    if (!regexphone.test(numbervalue)) {
            console.log('inside the number');

      let erreur = document.createElement("p");
      erreur.innerHTML =
        "<strong>Numéro de téléphone doit debuter par 06</strong>";
      erreurs.appendChild(erreur);
    }

    // 
  }
  //  console.log(workers);
// vider les chmaps apres la validation
   document.getElementById('form_add').reset();
}

// attacher la fonction au evenement
let form_add = document.getElementById("form_add");
form_add.addEventListener("submit", addWorker);



function workerRender(place) {
  console.log(workers);
//   selection du div des employes
  const listContainer = document.getElementsByClassName(place)[0];
  listContainer.textContent = "";

  workers.forEach((worker) => {
    //creation d'elemtn li qui prend deatils du worker
    let li = document.createElement("li");
    // ajout du class worker
    li.className = "worker";
    // ajout d attribut data-id
    li.dataset.id = worker.id;
    // ajout d image nom et role d employe
    li.innerHTML = `
            <img src="${worker.photo}" alt="user_photo"/>
            <div>
                <strong>${worker.name}</strong><br/>
                ${worker.role}
            </div>
            <button class="remove">X</button>
        `;
    // attacher l evenement du click au employe pour afficher les details
    li.addEventListener("click", detailsWorker);
    // selection du button du suppression
    const removeButton = li.querySelector(".remove");
    console.log(removeButton);
    // attacher l evenement du click au employe pour supprimer l employe
    removeButton.addEventListener("click", (e) => {
        // arreter la propogation d evenemnt parent 
      e.stopPropagation();
      // e.stopImmediatePropagation();
    //   invocation du fonction suppression
      removeEmploye(e);
    });
    // ajout d employ au zone de listage 
    listContainer.appendChild(li);
  });
}