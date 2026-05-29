import { Helmet } from "react-helmet-async";

import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import MidCTA from "./components/sections/MidCTA";
import Solution from "./components/sections/Solution";
import Proof from "./components/sections/Proof";
import Pricing from "./components/sections/Pricing";
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

        {/* GLOBAL PAGE WRAPPER */}
        <main className="flex flex-col">
          
          {/* HERO (full height focus section) */}
          <section className="min-h-screen flex items-center justify-center px-6">
            <div className="container text-center">
              <Hero />
            </div>
          </section>

          {/* PROBLEM */}
          <section className="section">
            <div className="container container-text text-center">
              <Problem />
            </div>
          </section>

          {/* MID CTA (high intent capture) */}
          <section className="section bg-white/5">
            <div className="container container-text text-center">
              <MidCTA />
            </div>
          </section>

          {/* SOLUTION */}
          <section className="section">
            <div className="container container-text text-center">
              <Solution />
            </div>
          </section>

          {/* PROOF */}
          <section className="section bg-white/5">
            <div className="container container-text text-center">
              <Proof />
            </div>
          </section>

          {/* PRICING */}
          <section className="section">
            <div className="container">
              <Pricing />
            </div>
          </section>

          {/* FINAL CTA (conversion close) */}
          <section className="section bg-gradient-to-b from-black via-zinc-950 to-black">
            <div className="container container-text text-center">
              <FinalCTA />
            </div>
          </section>

        </main>

        {/* FLOATING SYSTEMS */}
        <Chatbot />
      </div>
    </SmoothScroll>
  );
}