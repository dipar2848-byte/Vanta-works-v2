import LeadForm from "../LeadForm";

export default function FinalCTA() {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold">
          Turn Your Website Into a Customer Machine
        </h2>

        <p className="text-zinc-400 mt-4">
          Stop losing leads. Start capturing every visitor.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <LeadForm />
      </div>
    </section>
  );
}