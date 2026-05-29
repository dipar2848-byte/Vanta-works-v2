import LeadForm from "../LeadForm";

export default function MidCTA() {
  return (
    <section className="mood-cta scene-solution">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-flex px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-sm mb-6">
            Free Website Growth Audit
          </div>

          <h2 className="text-display max-w-4xl mx-auto">
            Turn Your Website Into A Lead Generation System
          </h2>

          <p className="text-body max-w-2xl mx-auto mt-6">
            Get a personalised breakdown of how your website can attract,
            qualify and convert more customers automatically.
          </p>
        </div>

        <div className="max-w-2xl mx-auto glass-card p-6 md:p-10">
          <LeadForm />
        </div>

      </div>
    </section>
  );
}