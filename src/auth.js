class Authorization {
  constructor() {
    this.isLoggedIn = false;
  }

  setlogin() {
    this.isLoggedIn = true;
  }
  isLoggedIn() {
    return this.isLoggedIn;
  }
  revoke() {
    this.isLoggedIn = false;
  }
}

export default new Authorization();
