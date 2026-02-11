import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, FileText, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({ leads: 0, hospitals: 0, newLeads: 0, treatments: 0 });

  useEffect(() => {
    async function fetchStats() {
      const [leads, hospitals, newLeads, treatments] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("hospitals").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("treatments").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        leads: leads.count ?? 0,
        hospitals: hospitals.count ?? 0,
        newLeads: newLeads.count ?? 0,
        treatments: treatments.count ?? 0,
      });
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Leads", value: stats.leads, icon: Users, color: "text-primary" },
    { label: "New Leads", value: stats.newLeads, icon: TrendingUp, color: "text-accent" },
    { label: "Hospitals", value: stats.hospitals, icon: Building2, color: "text-teal-glow" },
    { label: "Treatments", value: stats.treatments, icon: FileText, color: "text-gold" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label} className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-display font-bold">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
