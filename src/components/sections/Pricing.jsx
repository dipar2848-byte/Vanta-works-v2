import Scene from "../motion/Scene";

const plans = [
  {
    name: "Starter",
    desc: "Website + lead capture"
  },
  {
    name: "Growth",
    desc: "Booking + CRM tracking"
  },
  {
    name: "Automation",
    desc: "AI + automation system"
  }
];

export default function Pricing() {
  return (
    <Scene>
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl sm:text-5xl font-bold text-center">
          Growth Systems Built For Results
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="glass p-6 rounded-3xl"
            >
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="mt-4 text-zinc-300">{plan.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}