import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const TreatmentDetail = () => {
  const { id } = useParams();
  const [treatment, setTreatment] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const { data: tData, error: tErr } = await supabase.from('treatments').select('*').eq('id', id).single();
      if (tErr) console.error('Failed to load treatment', tErr);
      setTreatment(tData);
      if (tData?.category_id) {
        const { data: cData, error: cErr } = await supabase.from('treatment_categories').select('*').eq('id', tData.category_id).single();
        if (cErr) console.error('Failed to load category', cErr);
        setCategory(cData);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="p-8">Loading…</div>;
  if (!treatment) return <div className="p-8">Treatment not found</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <Link to="/" className="text-sm text-muted-foreground">← Back</Link>
      <div className="mt-6 card-netflix p-8">
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-lg bg-muted flex items-center justify-center text-3xl">{category?.icon ?? '🏥'}</div>
          <div>
            <h1 className="text-2xl font-display font-bold">{treatment.name}</h1>
            <p className="text-sm text-muted-foreground">{category?.name}</p>
          </div>
        </div>

        <div className="mt-6 text-muted-foreground">
          <p>{treatment.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetail;
