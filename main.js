let card=document.querySelector('.card')
let addForm = document.querySelector(".addForm");
let editForm = document.querySelector(".editForm");
let idx = null;

// modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// modal

addForm.onsubmit = (event) => {
  event.preventDefault();
  const target = event.target;

  let user = {
    id: new Date().getTime(),
    theName: target["theName"].value,
    aboutMe: target["aboutMe"].value,
    complete:false

    
  };
 
  users.push(user);

  addForm.reset();
  render();
};

editForm.onsubmit = (event) => {
  event.preventDefault();
  const target = event.target;

  users = users.map((user) => {
    if (user.id === idx) {
      user.theName = target["theName"].value;
      user.aboutMe = target["aboutMe"].value;
    }
    return user;
  });
  modal.style.display = "none";

  render();
};

let users = [
  {
    id: 1,
    theName: "John",
    aboutMe: "John Doe is american boy",
    complete:false
  },
];

function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
  render();
}

function setHeart (id){
    users=users.map((user)=>{
      if (user.id===id)
      {
        user.complete = !user.complete
      }
      return user;
    })
    render()

}

function render() {
  card.innerHTML = "";

  users.forEach((user) => {
    let newDiv = document.createElement("div");
    let title=document.createElement('h4')
    title.innerHTML=user.theName
    let p=document.createElement('p')
    p.innerHTML=user.aboutMe
    let dil=document.createElement('img')
    dil.style.width='50px'
    dil.style.height='50px'
    if (user.complete===true)
    {
      dil.src='./img/red.jpg'
    }
    else
    {
      dil.src='/img/white.jpg'
    }
    dil.onclick = () => setHeart(user.id)
    newDiv.appendChild(title)
    newDiv.appendChild(p)
    card.appendChild(newDiv)
    newDiv.appendChild(dil)
    
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "edit";
    btnEdit.onclick = () => {
      idx = user.id;
      editForm["theName"].value = user.theName;
      editForm["aboutMe"].value = user.aboutMe;
      modal.style.display = "block";
    };

    newDiv.appendChild(btnEdit);
   
    let btnDel = document.createElement("button");
    btnDel.innerHTML = "delete";

    btnDel.onclick = () => deleteUser(user.id);

    newDiv.appendChild(btnDel);
    
    card.appendChild(newDiv);
  });
}
render();
