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

        <Hero />
        <Problem />
        <MidCTA />
        <Solution />
        <Proof />
        <Pricing />
        <FinalCTA />

        <Chatbot />
      </div>
    </SmoothScroll>
  );
}