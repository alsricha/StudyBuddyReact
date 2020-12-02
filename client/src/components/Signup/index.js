import React, { useState, useEffect, useContext } from "react";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";

// import userData from "../../utils/UserContext";
// import { sendMail } from "../../../../controllers/nodemailerController";

const Signup = () => {
  // const nodemailer = require('nodemailer');
  // // const sendgridTransport = require('nodemailer-sendgrid-transport')
  const {
    userData,
    handleInputChange,
    handleSignup,
    failureMessage,
  } = useContext(UserContext);
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validUserName, setValidUserName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [imageSelected, setImageSelected] = useState("");
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(errorMessage);
  }, []);

  const uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', imageSelected)
    data.append('upload_preset', 'gsthrmj6')
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/studybuddycloud/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
      console.log(file.secure_url);
      handleSignup()
    }

  const handleConfirmPassword = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
  };

  // make sure firstname is at least 3 characters
  const checkFirstname = () => {
    const length = userData.firstname.length;
    if (length === 0) {
      setValidFirstName(false);
      setErrorMessage({ ...errorMessage, firstname: "" });
    } else if (length < 3) {
      setValidFirstName(false);
      setErrorMessage({
        ...errorMessage,
        firstname: "First Name should be at least 3 characters.",
      });
    } else {
      setValidFirstName(true);
      setErrorMessage({ ...errorMessage, firstname: "" });
    }
  };

  // make sure firstname is at least 3 characters
  const checkLastname = () => {
    const length = userData.lastname.length;
    if (length === 0) {
      setValidLastName(false);
      setErrorMessage({ ...errorMessage, lastname: "" });
    } else if (length < 3) {
      setValidLastName(false);
      setErrorMessage({
        ...errorMessage,
        lastname: "First Name should be at least 3 characters.",
      });
    } else {
      setValidLastName(true);
      setErrorMessage({ ...errorMessage, lastname: "" });
    }
  };

  // uses regex to check is email is valid
  const checkEmail = () => {
    const validEmail = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const valid = validEmail.test(userData.email);
    const length = userData.email.length;
    if (length === 0) {
      setValidEmail(false);
      setErrorMessage({ ...errorMessage, email: "" });
    } else if (!valid) {
      setValidEmail(false);
      setErrorMessage({
        ...errorMessage,
        email: "Please enter a valid email address.",
      });
    } else {
      setValidEmail(true);
      setErrorMessage({ ...errorMessage, email: "" });
    }
  };

  // make sure username is at least 5 characters
  const checkUsername = () => {
    const length = userData.username.length;
    if (length === 0) {
      setValidUserName(false);
      setErrorMessage({ ...errorMessage, username: "" });
    } else if (length < 5) {
      setValidUserName(false);
      setErrorMessage({
        ...errorMessage,
        username: "Username should be at least 5 characters.",
      });
    } else {
      setValidUserName(true);
      setErrorMessage({ ...errorMessage, username: "" });
    }
  };

  // checks is password meets regex test (at least 8 letters, 1 capital and 1 number)
  const checkPassword = () => {
    const strongPassword = new RegExp(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
    );
    const valid = strongPassword.test(userData.password);
    const length = userData.password.length;
    if (length === 0) {
      setValidPassword(false);
      setErrorMessage({ ...errorMessage, password: "" });
    } else if (!valid) {
      setValidPassword(false);
      setErrorMessage({
        ...errorMessage,
        password: "Password should be at least 8 letters, 1 capital & 1 number",
      });
    } else {
      setValidPassword(true);
      setErrorMessage({ ...errorMessage, password: "" });
    }
  };

  // checks if 2 password fields match
  const checkConfirmPassword = () => {
    
    if (confirmPassword.length === 0) {
      setIsConfirmed(false);
      setErrorMessage({ ...errorMessage, confirmPassword: "" });
    } else if (
      userData.password !== "" &&
      userData.password === confirmPassword
    ) {
      setIsConfirmed(true);
      setErrorMessage({ ...errorMessage, confirmPassword: "" });
    } else {
      setIsConfirmed(false);
      setErrorMessage({
        ...errorMessage,
        confirmPassword: "Passwords must match",
      });
    }
  }

  // const welcomeMail = (userData) => {
  //   transporter = nodemailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 587,
  //     auth: {
  //         user: '' ,
  //         pass: '',
  //     }
  // });

  // Message object
  // let message = {
  //     from: 'German <nodetest30@gmail.com>',

  //     // Comma separated list of recipients
  //     to: userData.email,
  //     bcc: '',

  //     // Subject of the message
  //     subject: 'Welcome to StuddyBuddy! Connect with students around your area to start your learning journey!',

  //     // plaintext body
  //     text: 'Welcome to Studdybuddy!',
      

  //     // HTML body
  //     html:
  //         '<p>Welcome to StuddyBuddy! Connect with students around your area to start your learning journey!<p>'

      
  // };

  // let info = transporter.sendMail(message);
  // res.json(info)
  // console.log('Message sent successfully as %s', info.messageId);



  

  return (
    <div>
      <h2 className="loginTitle">Signup</h2>
      <hr />
      {failureMessage ? <Alert type="danger">{failureMessage}</Alert> : <p></p>}
      <Form>
        <FormGroup>
          <Label for="firstname">First Name</Label>
          <Input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="firstname"
            value={userData.firstname}
            onChange={handleInputChange}
            onBlur={checkFirstname}
            valid={validFirstName}
          />
          <FormText>{errorMessage["firstname"]}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="lastname">Last Name</Label>
          <Input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="lastname"
            value={userData.lastname}
            onChange={handleInputChange}
            onBlur={checkLastname}
            valid={validLastName}
          />
          <FormText>{errorMessage["lastname"]}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="email@email.com"
            value={userData.email}
            onChange={handleInputChange}
            onBlur={checkEmail}
            valid={validEmail}
          />
          <FormText>{errorMessage["email"]}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={userData.username}
            onChange={handleInputChange}
            onBlur={checkUsername}
            valid={validUserName}
          />
          <FormText>{errorMessage["username"]}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={userData.password}
            onChange={handleInputChange}
            onBlur={checkPassword}
            valid={validPassword}
          />
          <FormText>{errorMessage["password"]}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            name="password"
            id="confirmPassword"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            onKeyUp={checkConfirmPassword}
            valid={isConfirmed}
          />
          <FormText>{errorMessage["confirmPassword"]}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="image">Profile Image</Label>
          <Input
            type="file"
            name="file"
            placeholder="profile image"
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
            />
             {/* <button onClick ={uploadImage}>Upload Image</button> */}
        </FormGroup>
        {/* if all fields are valid, allow the user to submit the form */}
        {validFirstName &&
        validLastName &&
        validEmail &&
        validUserName &&
        validPassword &&
        isConfirmed ? (
          <Button onClick={uploadImage} color="success" block>
            Signup
          </Button>
        ) : (
          <Button onClick={uploadImage} color="danger" block disabled>
            Signup
          </Button>
        )}
        <p className="signupLink">
          <Link to="/login">Already have an account? Sign in here</Link>
        </p>
      </Form>
    </div>
  )}


export default Signup;
