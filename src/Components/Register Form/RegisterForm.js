import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../Molecules/Custom Button/CustomButton";
import CustomInput from "../../Molecules/Custom Input/CustomInput";
import styles from "./RegisterForm.module.css";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameError("");
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setLastNameError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    const firstNameRegex = /^[a-zA-Z]{2,30}$/;
    const lastNameRegex = /^[a-zA-Z]{2,30}$/;
    const emailRegex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,20}$/;

    if (!firstNameRegex.test(firstName)) {
      setFirstNameError(
        "Invalid First Name! Your First Name must contain only alphabets and should be 2 - 30 characters long."
      );
      valid = false;
    }

    if (!lastNameRegex.test(lastName)) {
      setLastNameError(
        "Invalid Last Name! Your Last Name must contain only alphabets and should be 2 - 30 characters long."
      );
      valid = false;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email. Please enter a valid email address.");
      valid = false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Invalid password. Password must contain at least 8 characters, including atleast one upper case alphabet, one special character and one number."
      );
      valid = false;
    }

    if (valid) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userWithEmailExists = users.some((user) => user.email === email);

      if (userWithEmailExists) {
        setEmailError("Email already taken");
      } else {
        const id = uuidv4();
        const user = { id, image, firstName, lastName, email, password };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        swal({
          title: "Registration Successful!",
          text: "Congratulations! You are signed up!",
          icon: "success",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: styles["SweetAlertButton"],
              closeModal: true,
            },
          },
          dangerMode: false,
        }).then((value) => {
          if (value) {
            navigate("/login");
          }
        });
        setImage(null);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <form className={styles.FormContainer} onSubmit={handleSubmit}>
      <div className={styles.HeaderContainer}>
        <img
          className={styles.ProfilePhoto}
          onClick={handleImageClick}
          src={
            image
              ? image
              : "https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0="
          }
          height="80"
          width="80"
          alt="Profile"
        />
        <h2>Taskopolis</h2>
      </div>

      <input
        className={styles.CustomInputBox}
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
        value=""
      />
      <CustomInput
        className={styles.CustomInputBox}
        onChange={handleFirstNameChange}
        type="text"
        placeholder="First name"
        value={firstName}
        required
      />
      <span style={{ color: "red" }}>{firstNameError}</span>
      <CustomInput
        className={styles.CustomInputBox}
        onChange={handleLastNameChange}
        type="text"
        placeholder="Last name"
        value={lastName}
        required
      />
      <span style={{ color: "red" }}>{lastNameError}</span>

      <CustomInput
        className={styles.CustomInputBox}
        onChange={handleEmailChange}
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        required
      />
      <span style={{ color: "red" }}>{emailError}</span>
      <CustomInput
        className={styles.CustomInputBox}
        onChange={handlePasswordChange}
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        name="password"
        value={password}
        required
      />
      <span style={{ color: "red" }}>{passwordError}</span>
      <br />
      <CustomButton
        className={styles.ShowPasswordButton}
        type="button"
        onClick={toggleShowPassword}
        buttontext={showPassword ? "Hide Password" : "Show Password"}
      />
      <CustomButton
        className={styles.SignUpButton}
        type="submit"
        buttontext="Sign Up"
      />
      <div className={styles.CheckAccountDiv}>
        <span style={{ color: "black" }} className={styles.CheckAccountButton}>
          {" "}
          Already have an account?{" "}
          <Link className={styles.RouterLogin} to="/login">
            Login
          </Link>{" "}
        </span>
      </div>
    </form>
  );
}

export default RegisterForm;
