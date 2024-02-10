import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

function App() {
  const [googleUserName, setGoogleUserName] = useState("");
  const [googleUserEmail, setGoogleUserEmail] = useState("");
  const [googleUserPassword, setGoogleUserPassword] = useState("");

  // Function to handle form input changes
  const handleUserData = () => {
    const userData = {
      email: googleUserEmail,
      name: googleUserName,
      password: googleUserPassword
    };
    return userData;
  };

  // Function to submit the form data using Axios
  const credentialResponse = async () => {
    try {
      const userData = handleUserData();
      const response = await axios.post("http://localhost:3001/auth/googleUser", userData);
      console.log("Post created:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    credentialResponse();
  }, []);

  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    <div>
      <h1>Login using google</h1>
      <div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            try {
              const decoded = jwtDecode(credentialResponse.credential);
              const userName = decoded.name;
              setGoogleUserName(userName);
              const userEmail = decoded.email;
              setGoogleUserEmail(userEmail);
              const userPassword = prompt("create any password for signup");
              setGoogleUserPassword(userPassword);
            } catch (error) {
              console.log("jwtdecode error");
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
      <LoginSocialFacebook
        appId="your app id (id is created from meta developer account )"
        onResolve={(data) => {
          console.log(data);
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </div>
  );
}

export default App;
