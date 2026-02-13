import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Category = {
  id: string;
  name: string;
  slug?: string;
  icon?: string | null;
  description?: string | null;
  bg_color?: string | null;
  color?: string | null;
  image_url?: string | null;
};

type TreatmentItem = {
  id: string;
  name: string;
  description?: string | null;
  category_id?: string | null;
  is_active?: boolean;
};

const TreatmentsSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [treatments, setTreatments] = useState<TreatmentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 6;
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    // load categories once
    const loadCats = async () => {
      const { data, error } = await supabase.from('treatment_categories').select('*');
      if (error) console.error('Failed to load categories', error.message);
      setCategories((data || []) as Category[]);
    };
    loadCats();
  }, []);

  // debounce search input to avoid firing on every keystroke immediately
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 250);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query: any = supabase.from('treatments').select('*', { count: 'exact' }).eq('is_active', true);
      if (debouncedSearch) query = query.ilike('name', `%${debouncedSearch}%`);
      query = query.order('created_at', { ascending: true }).range(from, to);

      const { data, error, count } = await query;
      if (error) console.error('Failed to load treatments', error.message || error);
      setTreatments((data || []) as TreatmentItem[]);
      setTotalCount(count || 0);
      setLoading(false);
    };

    load();
  }, [page, debouncedSearch]);

  const getCategory = (id?: string | null) => categories.find(c => c.id === id);

  return (
    <section id="treatments" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Treatments</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-3 mb-4">
            Popular Treatments & Savings
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Compare real prices from accredited hospitals worldwide.
          </p>
        </motion.div>

        {loading && <div className="text-center text-muted-foreground">Loading treatments…</div>}

        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex-1">
            <input
              placeholder="Search treatments by name..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="input-netflix w-full max-w-lg"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {totalCount > 0 ? `Showing ${Math.min(totalCount, page * PAGE_SIZE)} of ${totalCount}` : ''}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment, i) => {
            const cat = getCategory(treatment.category_id);
            const cardStyle: any = {};
            if (cat?.bg_color) cardStyle.background = cat.bg_color;
            if (cat?.color) cardStyle.borderColor = cat.color;
            return (
              <Link key={treatment.id} to={`/treatment/${treatment.id}`} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={cardStyle}
                  className="group p-6 rounded-2xl card-netflix hover:shadow-elevated transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center`} style={{ background: cat?.bg_color || undefined }}>
                      <span className="text-lg">{cat?.icon ?? '🏥'}</span>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: cat?.color || undefined }}>
                      {cat?.name ?? 'Other'}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-3">{treatment.name}</h3>
                  <div className="text-sm text-muted-foreground mb-3">{treatment.description}</div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {!loading && treatments.length === 0 && (
          <div className="text-center text-muted-foreground mt-6">No treatments found.</div>
        )}

        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: Math.max(1, Math.ceil(totalCount / PAGE_SIZE)) }).map((_, idx) => {
            const p = idx + 1;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded ${p === page ? 'bg-primary text-white' : 'bg-muted-foreground/10'}`}>
                {p}
              </button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/questionnaire">
            <Button size="lg" className="bg-accent-gradient text-accent-foreground shadow-soft hover:shadow-elevated px-8">
              Get Your Personalized Quote
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TreatmentsSection;