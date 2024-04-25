
export default function login(){
  const login = document.createElement('div');
  login.classList.add('login-box');
  login.innerHTML = `
  <form>
    <div class="user-box">
      <input type="text" name="username" required>
      <label>Username</label>
    </div>
    <div class="user-box">
      <input type="password" name="password" required>
      <label>Password</label>
    </div>
    <a class="center" href="#">
           SEND
       <span></span>
    </a>
  </form>
  `
  return login;
}