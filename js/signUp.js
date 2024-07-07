import Validation from "./Validation.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const cfPassword = document.querySelector("#confirm-password");
const loginButton = document.querySelector(".login-button");
const inputError = document.querySelectorAll(".input-error");
const succesmessge = document.querySelector(".success-message");
const errorMessage = document.querySelector(".error-message");
const loader = document.querySelector(".loader");
const loginButtontext = document.querySelector(".login-button-text");
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

loginButton.addEventListener("click", (e) => {
  // Ngăn chặn reload lại trang
  e.preventDefault();
  const emailValue = email.value;
  const psValue = password.value;
  const cfPasswordValue = cfPassword.value;

  const validation = new Validation(emailValue, psValue, cfPasswordValue);
  validation.isConfirmPassword();
  console.log(validation.error);
  const [nodeemailErr, nodepasswordErr, nodecfPasswordErr] = inputError;

  validation.toggleErr(nodeemailErr, validation.error.email);
  validation.toggleErr(nodepasswordErr, validation.error.password);
  validation.toggleErr(nodecfPasswordErr, validation.error.confirm);

  if (isEmpty(validation.error)) {
    loginButton.style.pointerEverts = "none";
    loader.style.display = "block";
    loginButtontext.style.display = "none";

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailValue, psValue)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log();
        succesmessge.style.display = "block";

        window.location.href = "../html/signIn.js.html";

        setTimeout(() => {
          succesmessge.style.display = "none";
        }, 30000);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMsg = error.message;
        errorMessage.style.display = "block";
        errorMessage.textcontent = errorMsg;
        console.log(errorCode);
        console.log(errorMessage);
      })
      .finally(() => {
        loginButton.style.pointerEverts = "auto";
        loader.style.display = "none";
        loginButtontext.style.display = "bock";
      });
  }
});
// nodoemailErr.textContent = validation.error.email;
// nodoemailErr.style.vislibility = "visible";
// nodoemailErr.parentNode.classList.add("has-error");

// nodepasswordErr.textContent = validation.error.password;
// nodepasswordErr.style.vislibility = "visible";
// nodepasswordErr.parentNode.classList.add("has-error");

// nodecfPasswordErr.textContent = validation.error.cfPassword;
// nodecfPasswordErr.style.vislibility = "visible";
// nodecfPasswordErr.parentNode.classList.add("has-error");
