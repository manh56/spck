class Validation {
  //bat loi
  constructor(email, password, confirmPw) {
    this.email = email;
    this.password = password;
    this.confirmPw = confirmPw;
    this.error = {};
    this.isEmail();
    this.isPassword();
  }

  isEmail() {
    const regexEmail =
      /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!regexEmail.test(this.email)) {
      this.error.email = "Bạn vui lòng nhập đúng email";
    }
  }

  isPassword() {
    // const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    // if (!regexPassword.test(this.password)) {
    //   this.error.password = "Bạn vui lòng nhập đúng định dạng mật khẩu";
    // }

    if (this.password.length < 1) {
      this.error.password = "Bạn vui lòng nhập đúng định dạng mật khẩu";
    }
  }

  isConfirmPassword() {
    if (this.confirmPw === "") {
      this.error.confirm = "ban vui long xac thuc lai mat khau  ";
    }
    if (this.password !== this.confirmPw) {
      this.error.confirm = "Bạn nhập không khớp password";
    }
  }
  toggleErr(node, err) {
    node.textContent = err;
    node.style.visibility = err ? "visible" : "hidden";
    node.parentNode.classList = err ? "form-control has-error" : "form-control";
  }

  // hideErr(node, err) {
  //   node.textContent = err;
  //   node.style.visibility = "hidden";
  //   node.parentNode.classList.add("has-error");
  // }
}

export default Validation;

// const lan1 = new Validation("lan1@gmail.com", "123456", "123456");
// lan1.isEmail();
// const lan2 = new Validation("0392333", "abcxyz", "abcxyz");
// lan2.isEmail();
