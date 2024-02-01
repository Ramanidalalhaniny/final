<h3>Sign In</h3>
<form id="loginForm">
  <label for="username"><b>Username</b></label>
  <input type="text" placeholder="Enter Username" id="loginUsername" name="username" >
  <label for="password"><b>Password</b></label>
  <input type="password" placeholder="Enter Password" name="password" id="loginPassword">
  <button type="button" onclick="login()">Login</button>
</form>
<h3>Register</h3>
<form id="registerForm">
  <label for="username"><b>Username</b></label>
  <input type="text" placeholder="Enter Username" name="username" id="registerUsername">
  <label for="password"><b>Password</b></label>
  <input type="password" placeholder="Enter Password" name="password" id="registerPassword">
  <button type="button" onclick="register()">Register</button>
</form>
<script>
  async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    try {
      const response = await fetch('/login', {method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  async function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Error registering:', error);
    }
  }
</script>
