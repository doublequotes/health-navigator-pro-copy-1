import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 14, suffix: "M+", label: "Medical tourists annually", prefix: "" },
  { value: 70, suffix: "%", label: "Average cost savings", prefix: "Up to " },
  { value: 200, suffix: "+", label: "Accredited hospitals", prefix: "" },
  { value: 45, suffix: "+", label: "Countries covered", prefix: "" },
];

const CountUp = ({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-display font-bold text-foreground">
      {prefix}{count}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            The Medical Tourism Revolution
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Millions of patients are already saving billions by seeking treatment abroad — without compromising on quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card shadow-soft"
            >
              <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
