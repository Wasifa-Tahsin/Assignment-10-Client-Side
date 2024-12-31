import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";


const HomeLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <section>
        <Outlet></Outlet>
       
        </section>
      </main>
      <footer>
      <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;
