
const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const emailBox = document.getElementById("emailBox");
const phoneBox = document.getElementById("phoneBox");
const messageBox = document.getElementById("messageBox");


const db = firebase.firestore();







form.addEventListener("submit" , function (event) {
    event.preventDefault();
    if (firstName.value && lastName.value && emailBox.value && phoneBox.value && messageBox.value) {
      addUser(firstName.value, lastName.value , emailBox.value , phoneBox.value , messageBox.value);
      }
    
  
  });



  function addUser(first, last , email, phone , message) {
    console.log(first, last);
    db.collection("Users")
      .add({
        firstName: first,
        lastName: last,
        email : email,
        phone : phone,
        message : message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        console.log("Document added with ID:", docRef.id);
        // getUsers();
      })
      .catch((err) => console.log("err", err));
  }




