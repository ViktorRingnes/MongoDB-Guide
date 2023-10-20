// Listen for a click event on the login submit button
document.getElementById('login-submitBtn').addEventListener('click', async () => {
  
  // Retrieve values from the username and password fields
  const loginUsernameField = document.getElementById('loginusername-field').value;
  const loginPasswordField = document.getElementById('loginpassword-field').value;

  // Create a user object with the username and password
  const loginUser = {
    username: loginUsernameField,
    password: loginPasswordField,
  };

  try {
    // Send a POST request to the server to authenticate the user
    const response = await fetch('IP/LOCALHOST/RANGE/getUser', { //Example URL: http://0.0.0.0:3000/addUser
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUser),
    });

    // Parse the JSON response from the server
    const dataFromServer = await response.json();
    
    // Check if the user exists and the password matches
    if (dataFromServer && dataFromServer.user && dataFromServer.user.password === loginUser.password) {
      window.location.href = 'home.html'; // Redirect to the home page
    } else {
      // Display an invalid login information message
      const invalidLoginInfo = document.getElementById('inval-info-login');
      invalidLoginInfo.style.display = "block";
    }
  } catch (error) {
    // Log any errors that occur during the login process
    console.error('There was a problem with the login:', error);
  }
});
