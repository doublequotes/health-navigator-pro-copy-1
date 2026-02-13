import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <section id="coming-soon" className="py-24 bg-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-teal-glow/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-coral/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-primary-foreground mb-6">
            Comming Soon ......
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-10">
            We're building a seamless bridge to the world's best medical treatments at a fraction of the cost.          
          </p>
          <p className="text-sm text-primary-foreground/50 mt-6">
            Stay tuned with us for the official launch and be among the first to experience the future of healthcare savings. 
            <br />
            Your journey to world-class care is just around the corner!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoon;
