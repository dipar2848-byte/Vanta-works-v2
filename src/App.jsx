import { Helmet } from "react-helmet-async";

import Navbar from "./components/Navbar";

import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import Solution from "./components/sections/Solution";
import Pricing from "./components/sections/Pricing";

import MidCTA from "./components/sections/MidCTA";
import FinalCTA from "./components/sections/FinalCTA";

import CursorGlow from "./components/CursorGlow";
import Chatbot from "./components/Chatbot";
import SmoothScroll from "./components/motion/SmoothScroll";

export default function App() {
  return (
    <SmoothScroll>
      <Helmet>
        <title>VantaWorks — Conversion Systems</title>
      </Helmet>

      <div className="bg-black text-white overflow-x-hidden">
        <CursorGlow />
        <Navbar />

        {/* HERO SCENE */}
        <section className="scene-hero mood-hero min-h-screen flex items-center justify-center">
          <Hero />
        </section>

        {/* PROBLEM SCENE */}
        <section id="problem" className="scene-problem mood-problem">
          <div className="container container-text text-center">
            <Problem />
          </div>
        </section>

        {/* MID CTA SCENE */}
        <section className="scene-proof mood-proof">
          <div className="container container-text text-center">
            <MidCTA />
          </div>
        </section>

        {/* SOLUTION SCENE */}
        <section id="solution" className="scene-solution mood-solution">
          <div className="container container-text text-center">
            <Solution />
          </div>
        </section>

        {/* PRICING SCENE */}
        <section id="pricing" className="scene-pricing mood-pricing">
          <div className="container">
            <Pricing />
          </div>
        </section>

        {/* FINAL CTA SCENE */}
        <section className="scene-cta mood-cta">
          <div className="container container-text text-center">
            <FinalCTA />
          </div>
        </section>

        <Chatbot />
      </div>
    </SmoothScroll>
  );
}