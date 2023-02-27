import React from "react";
import styles from "./Home.module.css";
import TaskopolisBox from "../../Components/Taskopolis Box/TaskopolisBox";
import HomeCover from "../../Components/Home Cover/HomeCover";
import { LoginAtom } from "../../Atom/Login Atom/LoginAtom";
import { useRecoilValue } from "recoil";

function Home() {
  const isLoggedIn = useRecoilValue(LoginAtom);

  return (
    <div className={styles.MainHomeContainer}>
      {isLoggedIn ? <TaskopolisBox /> : <HomeCover />}
    </div>
  );
}

export default Home;
