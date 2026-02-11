import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Building2, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Hospital = Tables<"hospitals">;

export default function Hospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", city: "", country: "", contact_email: "" });
  const { toast } = useToast();

  const fetchHospitals = async () => {
    const { data } = await supabase.from("hospitals").select("*").order("created_at", { ascending: false });
    setHospitals(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchHospitals(); }, []);

  const handleAdd = async () => {
    if (!form.name || !form.city || !form.country) return;
    const { error } = await supabase.from("hospitals").insert({
      name: form.name,
      city: form.city,
      country: form.country,
      contact_email: form.contact_email || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Hospital added" });
      setForm({ name: "", city: "", country: "", contact_email: "" });
      setOpen(false);
      fetchHospitals();
    }
  };

  const toggleVerified = async (id: string, current: boolean) => {
    await supabase.from("hospitals").update({ is_verified: !current }).eq("id", id);
    setHospitals((prev) => prev.map((h) => (h.id === id ? { ...h, is_verified: !current } : h)));
  };

  if (loading) return <p className="text-muted-foreground">Loading hospitals…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Hospital Onboarding</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Add Hospital
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Hospital</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City *</Label>
                  <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Country *</Label>
                  <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input type="email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} />
              </div>
              <Button onClick={handleAdd} className="w-full">Add Hospital</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {hospitals.length === 0 ? (
        <p className="text-muted-foreground">No hospitals onboarded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitals.map((h) => (
            <Card key={h.id} className="shadow-soft">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{h.name}</CardTitle>
                </div>
                <Badge variant="outline" className={h.is_verified ? "border-primary text-primary" : "border-muted-foreground text-muted-foreground"}>
                  {h.is_verified ? "Verified" : "Pending"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{h.city}, {h.country}</p>
                {h.contact_email && <p className="text-sm text-muted-foreground">{h.contact_email}</p>}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => toggleVerified(h.id, h.is_verified)}
                >
                  {h.is_verified ? <XCircle className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                  {h.is_verified ? "Unverify" : "Verify"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
