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


function addExperience() {
    // selection du zone dajout des exps 
  let experience_container = document.getElementsByClassName(
    "experience-container"
  )[0];
//   creation du div qui va avoir le html d exps
  let div_experience = document.createElement("div");
//   ajout du html a div 
  div_experience.innerHTML = `
                    <label>Company</label>
                    <input type="text" class="experience_company">
                    <label for="">Role</label>
                    <input type="text" class="experience_role">
                    <label for="">From</label>
                    <input type="date" class="experience_hiredate">
                    <label for="">To</label>
                    <input type="date" class="experience_leavedate">
                `;
    // ajout du champs de saisie a la zone d ajout d exps 
  experience_container.append(div_experience);
}

// attachement d evenements pour invoker la fonction 
document
  .getElementsByClassName("add-experience")[0]
  .addEventListener("click", () => {
    addExperience();
  });

function detailsWorker(e) {
//   console.log("inside the detials function");
  // recuperation d'id assigne a chaque div d'employe cree
  const element = e.target.dataset.id;
  console.log(e.target.dataset.id);
//recherche par id -- worker_distinct contient l'employe trouve format {objet}
  let worker_distinct = workers.find((ele) => ele.id == element);
  // console.log(worker_distinct);
//selection du popup details
  let container = document.getElementsByClassName("worker_details")[0];
  //creation du conteneur qui va contient les details d employe
  let ul_item = document.createElement("div");
// html details d'experience
  let experiences = worker_distinct.experiences
    .map((exp) => {
      return `
                <div class="experience">
                    <strong>${exp.company}</strong>
                    <strong>Role</strong><p>${exp.role}</p>
                    <strong>Period</strong><p>${exp.hireDate} -- ${exp.leaveDate}</p>
                </div>
            `;
    })
    .join("");
  // insertion du reste html en div
  ul_item.innerHTML = `
        <div class="photo_name_role">
            <div><img src="${worker_distinct.photo}" alt="avatar"></div>
            <div><h2>${worker_distinct.name}</h2><h4>${worker_distinct.role}</h4></div>
        </div>
        <div class="email_phone_location">
            <strong>Email</strong><p>${worker_distinct.email}</p>
            <strong>Phone</strong><p>${worker_distinct.number}</p>
            <strong>location</strong><p>${worker_distinct.location}</p>
        </div>
        <div>
            <h1>Work experiences</h1>
            <div>${experiences}</div>
        </div>
        <button id="close">Close</button>
    `;
  // ajout au popup details
  container.appendChild(ul_item);
//   affichage de popup 
  container.style.display = "block";
//   attacher l evenement click pour cacher le pop up 
  document.querySelector("#close").addEventListener("click", (e) => {
    const workerDetails = e.currentTarget.closest(".worker_details");
    // si il existait cacher le 
    if (workerDetails) {
      console.log("inside the if for workerdetails");
        workerDetails.style.display = "none";
      // e.stopPropagation();
    }
  });
}


function removeEmploye(e) {
    // recuperation d id  d element clique 
  let element_removed_id = parseInt(
    e.target.closest("[data-id]").getAttribute("data-id")
  );
  console.log(element_removed_id);
//   recherche d indice  demplye qui egale l id 
  const index = workers.findIndex((worker) => worker.id === element_removed_id);
  console.log(index)
//   findIndex retourne -1 s il ne trouve rien 
  if (index !== -1) {
    // supression d employe du liste par son indice 
    workers.splice(index, 1);
    console.log(workers);
    
  }
//   appelle de workerRender pour afficher le changement
  workerRender("worker-list");
}