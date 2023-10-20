// Attach a click event listener to the registration submit button
document.getElementById('register-submitBtn').addEventListener('click', async () => {
    
    // Get the username and password input values
    const regusername = document.querySelector('[name="registerusername"]').value;
    const regpassword = document.querySelector('[name="registerpassword"]').value;
    
    // Get the input elements for displaying error
    const regUsernameinputdisplay = document.getElementById('register-username-input');
    const regPasswordinputdisplay = document.getElementById('register-password-input');

    // Check if any of the fields are empty
    if (regusername.length < 1 || regpassword.length < 1) {
        
        // Indicate which fields are empty by modifying the UI
        if (regusername.length < 1) {
            regUsernameinputdisplay.style.border = "red solid 2px";
            regUsernameinputdisplay.placeholder = "Required Field";
        }

        if (regpassword.length < 1) {
            regPasswordinputdisplay.style.border = "red solid 2px";
            regPasswordinputdisplay.placeholder = "Required Field";
        }
        return; // Exit the function if any required field is empty
    }

    // Create a user object to send to the server
    const user = {
        username: regusername,
        password: regpassword,
    };

    try {
        // Make an asynchronous POST request to add a user
        const response = await fetch('IP/LOCALHOST/RANGE/addUser', { //Example URL: http://0.0.0.0:3000/addUser
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        // Parse the server response
        const result = await response.json();
        
        // Redirect to login if registration is successful
        if (result.status === "success") {
            window.location.href = 'login.html';
        } else if (result.status === "userExists") {
          // If username is already taken, update the UI to indicate this
          regUsernameinputdisplay.style.border = "red solid 2px";
          regUsernameinputdisplay.value = "";
          regUsernameinputdisplay.placeholder = "Username already taken";
        }

    } catch (error) {
        // Log any errors during the registration process
        console.error('There was a problem with the registration:', error);
    }
});
