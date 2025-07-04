import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Courses from "./components/pages/Courses";
import Detail from "./components/pages/Detail";
import Login from "./components/pages/account/Login";
import Register from "./components/pages/account/Register";
import MyCourses from "./components/pages/account/MyCourses";
import WatchCourses from "./components/pages/account/WatchCourses";
import CoursesEnrolled from "./components/pages/account/CoursesEnrolled";
import ChangePassword from "./components/pages/account/ChangePassword";
import { Toaster } from "react-hot-toast"
import Dashboard from "./components/pages/account/Dashboard";
import { RequireAuth } from "./components/commom/RequireAuth";
import CreateCourse from "./components/pages/account/courses/CreateCourse";

function App() {
   

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/my-courses" element={<MyCourses />} />
          <Route path="/account/watch-courses" element={<WatchCourses />} />
          <Route
            path="/account/courses-enrolled"
            element={<CoursesEnrolled />}
          />
          <Route path="/account/change-password" element={<ChangePassword />} />
            {/* <Route path="/account/dashboard" element={<Dashboard />} /> */}
          <Route path="/account/dashboard" element={
            
            <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />

          <Route path="/account/courses/create" element={

            <RequireAuth>
            <CreateCourse />
          </RequireAuth>
        } />

        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={false}
        />
        
    </>
  );
}

export default App;
