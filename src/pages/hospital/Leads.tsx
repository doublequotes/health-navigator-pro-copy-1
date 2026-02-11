import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type LeadHospital = Tables<"lead_hospitals">;

type AssignedLead = LeadHospital & {
  lead: {
    email: string;
    treatment_category: string;
    urgency: string | null;
    budget: string | null;
    diagnosis_details: string | null;
  } | null;
};

export default function HospitalLeads() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<AssignedLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [respondingId, setRespondingId] = useState<string | null>(null);
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");

  const fetchAssignments = async () => {
    const { data, error } = await supabase
      .from("lead_hospitals")
      .select("*, lead:leads(email, treatment_category, urgency, budget, diagnosis_details)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching assignments:", error);
    }
    setAssignments((data as AssignedLead[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchAssignments();
  }, [user]);

  const submitResponse = async (id: string) => {
    const { error } = await supabase
      .from("lead_hospitals")
      .update({
        quoted_price: parseFloat(price),
        response_notes: notes,
        status: "responded",
        responded_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Response submitted" });
    setRespondingId(null);
    setPrice("");
    setNotes("");
    fetchAssignments();
  };

  if (loading) return <p className="text-muted-foreground">Loading assigned leads…</p>;

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Assigned Leads</h1>

      {assignments.length === 0 ? (
        <p className="text-muted-foreground">No leads have been assigned to your hospital yet.</p>
      ) : (
        <div className="rounded-lg border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Email</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Quoted Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.lead?.email ?? "—"}</TableCell>
                  <TableCell>{a.lead?.treatment_category ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{a.lead?.urgency ?? "—"}</Badge>
                  </TableCell>
                  <TableCell>{a.lead?.budget ?? "—"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={a.status === "responded" ? "default" : "secondary"}
                    >
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {a.quoted_price ? `$${Number(a.quoted_price).toLocaleString()}` : "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(a.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {a.status === "pending" ? (
                      <Dialog
                        open={respondingId === a.id}
                        onOpenChange={(open) => {
                          if (!open) {
                            setRespondingId(null);
                            setPrice("");
                            setNotes("");
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setRespondingId(a.id)}>
                            Respond
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Treatment Plan & Pricing</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-2">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Patient: {a.lead?.email}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Treatment: {a.lead?.treatment_category}
                              </p>
                              {a.lead?.diagnosis_details && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  Details: {a.lead.diagnosis_details}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label>Quoted Price (USD)</Label>
                              <Input
                                type="number"
                                placeholder="e.g. 15000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Treatment Plan / Notes</Label>
                              <Textarea
                                placeholder="Describe the treatment plan, inclusions, duration, etc."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                              />
                            </div>
                            <Button
                              className="w-full"
                              disabled={!price}
                              onClick={() => submitResponse(a.id)}
                            >
                              Submit Response
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <span className="text-sm text-muted-foreground">Responded</span>
                    )}
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
