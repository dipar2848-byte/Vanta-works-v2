import Scene from "../motion/Scene";

export default function CTA() {
  return (
    <Scene>
      <div className="max-w-4xl mx-auto text-center w-full">
        <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
          Stop Losing Customers From Your Website
        </h2>

        <p className="mt-6 text-zinc-300 text-base sm:text-lg">
          If your website isn’t generating enquiries, it’s not a business tool.
        </p>

        <button className="mt-10 px-8 py-4 bg-purple-600 rounded-2xl text-lg">
          Build My System
        </button>
      </div>
    </Scene>
  );
}