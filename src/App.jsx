import { Helmet } from "react-helmet-async";

import Navbar from "./components/Navbar";

import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import Solution from "./components/sections/Solution";
import Pricing from "./components/sections/Pricing";
import MidCTA from "./components/sections/MidCTA";
import FinalCTA from "./components/sections/FinalCTA";

import Scene from "./components/webgl/Scene";

export default function App() {
  return (
    <>
      <Helmet>
        <title>VantaWorks — Cinematic System</title>
      </Helmet>

      <Navbar />

      <Scene>

        {/* HERO */}
        <section className="h-screen flex items-center justify-center">
          <Hero />
        </section>

        {/* PROBLEM */}
        <section className="h-screen flex items-center justify-center">
          <Problem />
        </section>

        {/* MID CTA */}
        <section className="h-screen flex items-center justify-center">
          <MidCTA />
        </section>

        {/* SOLUTION */}
        <section className="h-screen flex items-center justify-center">
          <Solution />
        </section>

        {/* PRICING */}
        <section className="h-screen flex items-center justify-center">
          <Pricing />
        </section>

        {/* FINAL CTA */}
        <section className="h-screen flex items-center justify-center">
          <FinalCTA />
        </section>

      </Scene>
    </>
  );
}