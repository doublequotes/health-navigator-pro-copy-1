import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ExternalLink, Eye } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Lead = Tables<"leads">;

const statusColors: Record<string, string> = {
  new: "bg-primary/10 text-primary border-primary/20",
  contacted: "bg-gold/10 text-gold border-gold/20",
  qualified: "bg-teal-glow/10 text-teal-glow border-teal-glow/20",
  converted: "bg-accent/10 text-accent border-accent/20",
  closed: "bg-muted text-muted-foreground border-border",
  withdrawn: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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
    const lead = leads.find((l) => l.id === id);
    const oldStatus = lead?.status;
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));

    // Trigger email notification
    try {
      await supabase.functions.invoke("notify-lead-status", {
        body: { lead_id: id, old_status: oldStatus, new_status: status },
      });
    } catch (err) {
      console.error("Notification error:", err);
    }
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
                <TableHead>View</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead>Urgency</TableHead>
                {/* <TableHead>Destination</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedLead(lead)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{(lead as any).full_name || "—"}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell className="capitalize">{lead.treatment_category?.replace(/_/g, " ")}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.urgency?.replace(/_/g, " ") ?? "—"}</Badge>
                  </TableCell>
                  {/*<TableCell className="text-sm">
                    {lead.destination_preference?.join(", ") || "—"}
                  </TableCell> */}
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

      {/* Lead detail dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-3 text-sm">
              <Row label="Full Name" value={(selectedLead as any).full_name} />
              <Row label="Email" value={selectedLead.email} />
              <Row label="Mobile" value={selectedLead.mobile} />
              <Row label="Date of Birth" value={(selectedLead as any).date_of_birth} />
              <Row label="Treatment" value={selectedLead.treatment_category?.replace(/_/g, " ")} />
              <Row label="Urgency" value={selectedLead.urgency?.replace(/_/g, " ")} />
              <Row label="Budget" value={selectedLead.budget?.replace(/_/g, " ")} />
              <Row label="Destinations" value={selectedLead.destination_preference?.join(", ")} />
              <Row label="Previous Diagnosis" value={selectedLead.previous_diagnosis?.replace(/_/g, " ")} />
              <Row label="Diagnosis Details" value={selectedLead.diagnosis_details} />
              <Row label="Passport Country" value={(selectedLead as any).passport_country?.replace(/_/g, " ")} />
              <Row label="Translation" value={(selectedLead as any).translation_language?.replace(/_/g, " ")} />
              <Row label="Virtual Consultation" value={(selectedLead as any).virtual_consultation?.replace(/_/g, " ")} />
              <Row label="Allergies/Conditions" value={(selectedLead as any).allergies_conditions?.map((a: string) => a.replace(/_/g, " ")).join(", ")} />
              {(selectedLead as any).prescription_url && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-medium w-36">Prescription:</span>
                  <a href={(selectedLead as any).prescription_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                    View file <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              <Row label="Status" value={selectedLead.status} />
              <Row label="Source" value={selectedLead.source} />
              <Row label="Created" value={format(new Date(selectedLead.created_at), "PPPp")} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <span className="text-muted-foreground font-medium w-36 shrink-0">{label}:</span>
      <span className="text-foreground capitalize">{value}</span>
    </div>
  );
}
