import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

type Lead = Tables<"leads">;

const statusColors: Record<string, string> = {
  new: "bg-primary/10 text-primary border-primary/20",
  contacted: "bg-gold/10 text-gold border-gold/20",
  qualified: "bg-teal-glow/10 text-teal-glow border-teal-glow/20",
  converted: "bg-accent/10 text-accent border-accent/20",
  closed: "bg-muted text-muted-foreground border-border",
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  if (loading) return <p className="text-muted-foreground">Loading leads…</p>;

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Lead Management</h1>

      {leads.length === 0 ? (
        <p className="text-muted-foreground">No leads yet. Leads appear here after questionnaire submissions.</p>
      ) : (
        <div className="rounded-lg border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.email}</TableCell>
                  <TableCell>{lead.treatment_category}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.urgency ?? "—"}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select value={lead.status} onValueChange={(v) => updateStatus(lead.id, v)}>
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(statusColors).map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(lead.created_at), "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
