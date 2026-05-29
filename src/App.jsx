import { Helmet } from "react-helmet-async";

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
        <title>VantaWorks</title>
      </Helmet>

      <div className="bg-black text-white overflow-x-hidden">
        <CursorGlow />

        <Hero />
        <Problem />
        <Solution />
        <Pricing />
        <CTA />

        <Chatbot />
      </div>
    </SmoothScroll>
  );
}