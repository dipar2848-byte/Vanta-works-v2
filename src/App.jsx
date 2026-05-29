import { Helmet } from "react-helmet-async";

import Navbar from "./components/Navbar";

import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import Solution from "./components/sections/Solution";
import Pricing from "./components/sections/Pricing";

import MidCTA from "./components/sections/MidCTA";
import FinalCTA from "./components/sections/FinalCTA";

import Scene from "./components/webgl/Scene";

import CursorGlow from "./components/CursorGlow";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <div className="bg-black text-white overflow-x-hidden relative">

      <Helmet>
        <title>VantaWorks — Conversion Systems</title>
      </Helmet>

      {/* BACKGROUND LAYER (WEBGL) */}
      <Scene />

      {/* UI LAYER */}
      <div className="relative z-10">

        <CursorGlow />
        <Navbar />

        {/* HERO */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <Hero />
        </section>

        {/* PROBLEM */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Problem />
          </div>
        </section>

        {/* MID CTA */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <MidCTA />
          </div>
        </section>

        {/* SOLUTION */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Solution />
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <Pricing />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-28 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <FinalCTA />
          </div>
        </section>

        <Chatbot />

      </div>
    </div>
  );
}