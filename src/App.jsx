import { Helmet } from "react-helmet-async";

import Navbar from "./components/Navbar";

import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import Solution from "./components/sections/Solution";
import Pricing from "./components/sections/Pricing";
import CTA from "./components/sections/CTA";

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

        {/* GLOBAL NAV */}
        <Navbar />

        {/* HERO */}
        <section className="mood-hero min-h-screen flex items-center justify-center">
          <Hero />
        </section>

        {/* PROBLEM */}
        <section id="problem" className="mood-problem">
          <div className="container container-text text-center">
            <Problem />
          </div>
        </section>

        {/* SOLUTION */}
        <section id="solution" className="mood-solution">
          <div className="container container-text text-center">
            <Solution />
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mood-pricing">
          <div className="container">
            <Pricing />
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="mood-cta">
          <div className="container container-text text-center">
            <CTA />
          </div>
        </section>

        {/* CHATBOT */}
        <Chatbot />
      </div>
    </SmoothScroll>
  );
}