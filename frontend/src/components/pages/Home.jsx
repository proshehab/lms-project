import React from "react";
import Layout from "../commom/Layout";
import Hero from "../commom/Hero";
import FeaturedCategories from "../commom/FeaturedCategories";
import FeaturedCourses from "../commom/FeaturedCourses";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCategories />
      <FeaturedCourses />
    </Layout>
  );
};

export default Home;
