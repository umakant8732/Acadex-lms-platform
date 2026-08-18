const MyLearningHero = ({ totalEnrolled }) => {
  const enrolledLabel = totalEnrolled === 1 ? "course" : "courses";

  return (
    <section className="mt-5 border border-black/5 bg-white p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/35">
        My Learning
      </p>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Continue learning from your enrolled courses
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-black/60 md:text-base">
            Access every course you have purchased, pick up where you left off,
            and return to your lessons anytime.
          </p>
        </div>

        <div className="border border-black/10 bg-[#f5f5f5] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-black/35">
            Enrolled
          </p>

          <p className="mt-4 text-4xl font-semibold tracking-tight">
            {totalEnrolled}
          </p>

          <p className="mt-2 text-sm text-black/55">
            {totalEnrolled} {enrolledLabel} in your library
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyLearningHero;
