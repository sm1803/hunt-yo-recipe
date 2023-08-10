const googleAuth = document.getElementById("googleAuth");
const create_acnt = document.getElementById("create_acnt");
const back = document.getElementById("back");
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const fullName = document.getElementById("fullName");
const password = document.getElementById("password");
const errorMsg = document.getElementById("error");

const load_bx = document.querySelector(".load_bx");
const load_text = document.querySelector(".load_text");
const loading = document.querySelector(".loading");
const check = document.getElementById("check");

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa8PM45tZmKY1_-5hW5ke-zAOB-ONjqik",
  authDomain: "wddm-120-test-fc069.firebaseapp.com",
  databaseURL: "https://wddm-120-test-fc069-default-rtdb.firebaseio.com",
  projectId: "wddm-120-test-fc069",
  storageBucket: "wddm-120-test-fc069.appspot.com",
  messagingSenderId: "828268920199",
  appId: "1:828268920199:web:f92d816fededec3a826722"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

googleAuth.addEventListener("click", (e) => {
  authorizeGoogleAuth();
});
async function authorizeGoogleAuth() {
  await signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info
    const user = result.user;
    console.log(user);
    // ...
    load_bx.classList.add("active");

    setTimeout(() => {
      load_text.textContent = 'Validating Info'
    }, 1000);
    setTimeout(() => {
      load_text.textContent = 'Checking for errors'
    }, 4000);
    setTimeout(() => {
      load_text.textContent = 'Assigning validation'
    }, 6000);

    setTimeout(() => {
      load_text.textContent = 'Submitting '
    }, 8000);
    setTimeout(() => {
      console.log("Form Submitted");
      loading.style.display = 'none';
      load_text.textContent = 'Submitted'
      check.style.display = 'block';
    }, 10000);
    setTimeout(() => {
      window.location.href = './index.html';
      //redirecting to the todoapp page
    }, 13000);
  }).catch((error) => {
    // Handle Erros here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode);
    // The email of the user's account used
    const email = error.email;
    // The AuthCredential type that was used
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
create_acnt.addEventListener("click", (e) => {
  formSignIn();
});
async function formSignIn() {
  await document.querySelector(".wrapper").classList.add("hide");
  await document.querySelector(".emailAuth").classList.add("show");
}
back.addEventListener("click", (e) => {
  document.querySelector(".wrapper").classList.remove("hide");
  document.querySelector(".emailAuth").classList.remove("show");
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(emailInput.value == ""){
    errorMsg.classList.add("invalid");
    emailInput.classList.add("invalid");
    errorMsg.textContent = 'Please fill the required fields';
  }else{
    validate();
  }
  if(fullName.value == ""){
    errorMsg.classList.add("invalid");
    fullName.classList.add("invalid");
    errorMsg.textContent = 'Please fill the required fields';
  }else{
    errorMsg.classList.remove("invalid");
    fullName.classList.remove("invalid");
    fullName.classList.add("valid");
  }
  if(password.value == ""){
    errorMsg.classList.add("invalid");
    password.classList.add("invalid");
    errorMsg.textContent = 'Please fill the required fields';
  }else{
    errorMsg.classList.remove("invalid");
    password.classList.remove("invalid");
    checkPassword();
  }
  password.addEventListener("keyup", (e) => {
    checkPassword();
  });
  function checkPassword() {
    if(password.value.length < 6){
      password.classList.add("invalid");
      errorMsg.classList.add("invalid");

      errorMsg.textContent = "Password must contain at least 6 Characters";
    }else{
      password.classList.remove("invalid");
      errorMsg.classList.remove("invalid");
      password.classList.add("valid");
    }
  }
  emailInput.addEventListener("keyup", (e) => {
    validate();
  });
  function validate() {
    let regexPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!emailInput.value.match(regexPattern)) {
      emailInput.classList.add("invalid");
      errorMsg.classList.add("invalid");
      (emailInput.valie !== "") ? errorMsg.textContent = "Enter a valid email address" : errorMsg.textContent = "Please fill the required fields";
    }else{
      emailInput.classList.remove("invalid");
      errorMsg.classList.remove("invalid");

      emailInput.classList.add("valid");
    }
  }
  if(emailInput.classList.contains("valid") && fullName.classList.contains("valid") && password.classList.contains("valid")){
    authenticateLogin();

    load_bx.classList.add("active");

    setTimeout(() => {
      load_text.textContent = 'Validating Info'
    }, 1000);
    setTimeout(() => {
      load_text.textContent = 'Checking for errors'
    }, 4000);
    setTimeout(() => {
      load_text.textContent = 'Assigning validation'
    }, 6000);

    setTimeout(() => {
      load_text.textContent = 'Submitting'
    }, 8000);
    setTimeout(() => {
      console.log("Form Submitted");
      loading.style.display = 'none';
      load_text.textContent = 'Submitted'
      check.style.display = 'block';
    }, 10000);
    setTimeout(() => {
      window.location.href = './index.html';
      //redirecting to the todoapp page
    }, 13000);
  }
  function authenticateLogin() {
    let email = emailInput.value;
    let fullNameVal = fullName.value;
    let passwords = password.value;

    // function to createUserCredentials and store it in an authenticate database //note that this login is a one-time-login user can't login in if the email exist
    createUserWithEmailAndPassword(auth, email, passwords, fullNameVal)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });

    //function to sign user in to the databse with their created credentials
    signInWithEmailAndPassword(auth, email, passwords, fullNameVal)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
});





// toDoPage js starts from here---------------------


// let todos = [];

// const filters = {
//     searchText: '',
//     hideCompleted: false
// }

// // this is for filtering the todo
// $('.search-todo').on('input', () =>{
//     filters.searchText = $('.search-todo').val();
//     createList(todos, filters);
// })

// // this is for rendering the todo
// const renderTodos = function(){
//     db.collection('todos').get().then(data =>{
//         data.docs.forEach(element =>{
//             const singleTodo = element.data();
//             todos.push(singleTodo);
//         });
//         createList(todos, filters);
//     });
// }

// // this is for displaying todos in the browser
// const createList = function (todos, filters) {
//     let count = 0;
//     const filteredTodos = $.grep(todos, element => {
//         return element.name.toLowerCase().includes(filters.searchText.toLowerCase());
//     })
//     $('.todos').empty();
//     filteredTodos.forEach(element =>{
//         let divElement = $('<div class="form-check card singleTodo">');
//         let buttonElement = $('<button class="btn btn-danger float-right">');
//         let labelElement = $('<label class="form-check-label">');
//         let checkboxElement = $('<input type="checkbox" class="form-check-input"/>');
//         let cardBodyElement = $('<div class="card-body">');

//         buttonElement.text('X');
//         buttonElement.on('click', ()=>{
//             deleteTodo(element);
//         })
//         checkboxElement.attr('checked', element.isCompleted);
//         checkboxElement.on('change', ()=>{
//             toggleTodo(element);
//         })
//         labelElement.append(checkboxElement);
//         labelElement.append('<span>'+element.name+'</span>');
//         cardBodyElement.append(labelElement);
//         cardBodyElement.append(buttonElement);
//         divElement.append(cardBodyElement);
//         $('.todos').append(divElement);
//         if(element.isCompleted == false){
//             count++;
//         }
//     })
//     $('.status').text('You have '+count+' todos left');
// }

// // this is for updating todo
// const toggleTodo = function (element) {
//     const new_todo = {
//         id: element.id,
//         isCompleted: !element.isCompleted,
//         name: element.name
//     }
//     db.collection('todos').doc(element.id).update(new_todo).then(()=>{
//         console.log('Updated successfully.');
//         element.isCompleted = !element.isCompleted;
//         createList(todos, filters);
//     }).catch(error=>{
//         console.log('Error occured', error);
//     })
// }

// // this is for deleting a todo
// const deleteTodo = function (element) {
//     db.collection('todos').doc(element.id).delete().then(()=>{
//         console.log('Todo deleted successfully.');
//         const todoIndex = todos.findIndex(todo => todo.id === element.id);
//         if(todoIndex != -1){
//             todos.splice(todoIndex, 1);
//             createList(todos, filters);
//         }
//     });
// };

// // this is for adding a todo
// $('.submit-todo').click((event) => {
//     event.preventDefault();
//     const id = uuidv4();
//     const todo = {
//         name: $('.new-todo').val(),
//         isCompleted: false,
//         id: id
//     }
//     db.collection('todos').doc(id).set(todo).then(()=>{
//         console.log('Todo added successfully!');
//         $('.new-todo').val('');
//         todos.push(todo);
//         createList(todos, filters);
//     }).catch(error=>{
//         console.log('Error occured', e);
//     })
// })

// // this is for hiding competed todos
// $('.hidecompleted').change(()=>{
//     if($('.hidecompleted').prop('checked')){
//         hideCompleted(todos, filters);
//     }else{
//         createList(todos, filters);
//     }
// })

// const hideCompleted = function (todos, filters) {
//     const filteredTodos = $.grep(todos, (element) => {
//         if(element.isCompleted == filters.hideCompleted){
//             return element;
//         }
//     })
//     createList(filteredTodos, filters);
// }

// renderTodos();