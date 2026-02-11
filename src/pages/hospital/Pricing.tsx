import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type HospitalTreatment = Tables<"hospital_treatments"> & {
  treatment: { name: string } | null;
};

export default function HospitalPricing() {
  const { user } = useAuth();
  const [treatments, setTreatments] = useState<HospitalTreatment[]>([]);
  const [availableTreatments, setAvailableTreatments] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [hospitalId, setHospitalId] = useState<string | null>(null);

  // Add form state
  const [addOpen, setAddOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [duration, setDuration] = useState("");
  const [addNotes, setAddNotes] = useState("");

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      // Get hospital ID for this user
      const { data: adminData } = await supabase
        .from("hospital_admins")
        .select("hospital_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!adminData) {
        setLoading(false);
        return;
      }
      setHospitalId(adminData.hospital_id);

      // Fetch hospital treatments with treatment names
      const { data: htData } = await supabase
        .from("hospital_treatments")
        .select("*, treatment:treatments(name)")
        .eq("hospital_id", adminData.hospital_id)
        .order("created_at", { ascending: false });

      setTreatments((htData as HospitalTreatment[]) ?? []);

      // Fetch all treatments for add dialog
      const { data: allTreatments } = await supabase
        .from("treatments")
        .select("id, name")
        .eq("is_active", true)
        .order("name");

      setAvailableTreatments(allTreatments ?? []);
      setLoading(false);
    };
    load();
  }, [user]);

  const toggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("hospital_treatments")
      .update({ is_active: !current })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    setTreatments((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_active: !current } : t))
    );
  };

  const addTreatment = async () => {
    if (!hospitalId || !selectedTreatment) return;

    const { error } = await supabase.from("hospital_treatments").insert({
      hospital_id: hospitalId,
      treatment_id: selectedTreatment,
      price_min: priceMin ? parseFloat(priceMin) : null,
      price_max: priceMax ? parseFloat(priceMax) : null,
      duration_days: duration ? parseInt(duration) : null,
      notes: addNotes || null,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Treatment pricing added" });
    setAddOpen(false);
    setSelectedTreatment("");
    setPriceMin("");
    setPriceMax("");
    setDuration("");
    setAddNotes("");

    // Refresh
    const { data: htData } = await supabase
      .from("hospital_treatments")
      .select("*, treatment:treatments(name)")
      .eq("hospital_id", hospitalId)
      .order("created_at", { ascending: false });
    setTreatments((htData as HospitalTreatment[]) ?? []);
  };

  if (loading) return <p className="text-muted-foreground">Loading treatment pricing…</p>;

  if (!hospitalId) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold mb-4">Treatment Pricing</h1>
        <p className="text-muted-foreground">
          Your account is not linked to a hospital. Please contact the admin.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Treatment Pricing</h1>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button>Add Treatment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Treatment Pricing</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Treatment</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                >
                  <option value="">Select a treatment…</option>
                  {availableTreatments.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price Min (USD)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 5000"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price Max (USD)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 15000"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Duration (days)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 7"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Notes / Inclusions</Label>
                <Textarea
                  placeholder="What's included in this package…"
                  value={addNotes}
                  onChange={(e) => setAddNotes(e.target.value)}
                />
              </div>
              <Button className="w-full" disabled={!selectedTreatment} onClick={addTreatment}>
                Save Pricing
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {treatments.length === 0 ? (
        <p className="text-muted-foreground">
          No treatment pricing set yet. Click "Add Treatment" to get started.
        </p>
      ) : (
        <div className="rounded-lg border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Treatment</TableHead>
                <TableHead>Price Range</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {treatments.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">
                    {t.treatment?.name ?? "Unknown"}
                  </TableCell>
                  <TableCell>
                    {t.price_min || t.price_max
                      ? `$${(t.price_min ?? 0).toLocaleString()} – $${(t.price_max ?? 0).toLocaleString()}`
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {t.duration_days ? `${t.duration_days} days` : "—"}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                    {t.notes ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={t.is_active}
                      onCheckedChange={() => toggleActive(t.id, t.is_active)}
                    />
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
