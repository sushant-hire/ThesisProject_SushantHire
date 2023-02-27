import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../Molecules/Custom Button/CustomButton";
import CustomInput from "../../Molecules/Custom Input/CustomInput";
import {  useSetRecoilState } from "recoil";
import { LoginAtom } from "../../Atom/Login Atom/LoginAtom";
import styles from "./LoginForm.module.css";
import swal from "sweetalert";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const setIsLogin = useSetRecoilState(LoginAtom);
  let navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (value === "") {
      setEmailError("Please fill this field");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (value === "") {
      setPasswordError("Please fill this field");
    } else {
      setPasswordError("");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    const emailRegex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,20}$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email. Please enter a valid email address.");
      valid = false;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Invalid password. Password must contain at least 8 characters, including one letter and one number."
      );
      valid = false;
    }
    if (valid) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        setIsLogin(true);
        localStorage.setItem("currentUser", JSON.stringify(user));
        swal({
          title: "Login Successful!",
          text: "Welcome to Taskopolis.",
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
            navigate("/");
          }
        });
      } else {
        swal({
          title: "User not found!",
          text: "Enter valid credentials.",
          icon: "error",
          buttons: {
            confirm: {
              text: "Okay",
              value: true,
              visible: true,
              className: styles["SweetAlertButton"],
              closeModal: true,
            },
          },
          dangerMode: false,
        });
      }
    }
  };

  return (
    <form className={styles.FormContainer} onSubmit={handleSubmit}>
      <div className={styles.HeaderContainer}>
        <h2>Taskopolis</h2>

        <img
          className={styles.ProfilePhoto}
          src={
            "https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0="
          }
          height="80"
          width="80"
          alt="Profile"
        />
      </div>
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
        buttontext="Login"
      />
      <div className={styles.CheckAccountDiv}>
        <span className={styles.CheckAccountButton}>
          Don't have an account?{" "}
          <Link className={styles.RouterLogin} to="/register">
            Register
          </Link>{" "}
        </span>
      </div>
    </form>
  );
}

export default LoginForm;
