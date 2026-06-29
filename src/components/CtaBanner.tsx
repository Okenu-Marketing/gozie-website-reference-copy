const CtaBanner = () => (
  <section className="max-w-4xl mx-auto px-6 md:px-16 py-20 text-center">
    <p className="text-muted-foreground text-sm mb-3">Let's build something your customers will love.</p>
    <p className="font-drama italic text-accent text-2xl md:text-3xl mb-8">OkenuMarketing</p>
    <a
      href="/start"
      className="inline-flex items-center bg-accent text-accent-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity gap-2"
    >
      Get Started <span>→</span>
    </a>
  </section>
);

export default CtaBanner;
