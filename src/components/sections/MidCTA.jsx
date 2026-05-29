import LeadForm from "../LeadForm";

export default function MidCTA() {
  return (
    <section className="py-24 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold">
        Want More Customers From Your Website?
      </h2>

      <p className="text-zinc-400 mt-4 mb-8 max-w-xl mx-auto">
        Get a free breakdown of how your website can start generating real leads.
      </p>

      <div className="max-w-md mx-auto">
        <LeadForm />
      </div>
    </section>
  );
}