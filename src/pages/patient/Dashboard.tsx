import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, FileText, Globe, User, Mail, Phone, MapPin, XCircle, Loader2, Edit, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Lead = Tables<"leads">;

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-green-100 text-green-800",
  closed: "bg-muted text-muted-foreground",
  withdrawn: "bg-destructive/10 text-destructive",
};

export default function PatientDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState<string | null>(null);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [profileRes, leadsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("leads").select("*").eq("email", user.email || "").order("created_at", { ascending: false }),
      ]);
      setProfile(profileRes.data);
      setLeads(leadsRes.data || []);
      setLoading(false);
    };
    load();
  }, [user]);

  const handleWithdraw = async (leadId: string) => {
    setWithdrawing(leadId);
    const { error } = await supabase.from("leads").update({ status: "withdrawn" } as any).eq("id", leadId);
    if (error) {
      toast({ title: "Error", description: "Could not withdraw enquiry.", variant: "destructive" });
    } else {
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: "withdrawn" } : l)));
      toast({ title: "Enquiry withdrawn" });
    }
    setWithdrawing(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const activeLeads = leads.filter((l) => l.status !== "withdrawn" && l.status !== "closed");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold mb-1">Welcome back!</h1>
        <p className="text-muted-foreground">Your medical tourism journey at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Enquiries</CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent><p className="text-3xl font-display font-bold">{leads.length}</p></CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Enquiries</CardTitle>
            <Heart className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent><p className="text-3xl font-display font-bold">{activeLeads.length}</p></CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Destinations</CardTitle>
            <Globe className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display font-bold">
              {new Set(leads.flatMap((l) => l.destination_preference || [])).size || "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Profile Card */}
      <Card className="shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-primary" /> My Profile
          </CardTitle>
          <Link to="/patient/profile">
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-3.5 w-3.5" /> Edit
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {profile ? (
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium text-foreground">{profile.full_name || "Not set"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium text-foreground">{profile.phone || "Not set"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Country:</span>
                <span className="font-medium text-foreground">{profile.country || "Not set"}</span>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Profile info will appear once your account is set up.</p>
          )}
        </CardContent>
      </Card>

      {/* Enquiries */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-foreground">My Enquiries</h2>
          <Link to="/questionnaire">
            <Button size="sm" className="bg-accent-gradient text-accent-foreground">New Enquiry</Button>
          </Link>
        </div>

        {leads.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">You haven't submitted any enquiries yet.</p>
              <Link to="/questionnaire">
                <Button className="bg-accent-gradient text-accent-foreground">Get Your Free Quote</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => {
              const raw = lead.questionnaire_answers as Record<string, any> | null;
              const isExpanded = expandedLead === lead.id;
              return (
                <Card key={lead.id} className="shadow-soft">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground capitalize">{lead.treatment_category?.replace(/_/g, " ")}</h3>
                          <Badge variant="secondary" className={statusColors[lead.status] || ""}>
                            {lead.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                          {lead.destination_preference && lead.destination_preference.length > 0 && (
                            <span>📍 {lead.destination_preference.join(", ")}</span>
                          )}
                          {lead.urgency && <span>⏱ {lead.urgency.replace(/_/g, " ")}</span>}
                          {lead.budget && <span>💰 {lead.budget.replace(/_/g, " ")}</span>}
                          <span>📅 {new Date(lead.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setExpandedLead(isExpanded ? null : lead.id)}>
                          {isExpanded ? "Hide Details" : "View Details"}
                        </Button>
                        {lead.status !== "withdrawn" && lead.status !== "closed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive border-destructive/30 hover:bg-destructive/10"
                            disabled={withdrawing === lead.id}
                            onClick={() => handleWithdraw(lead.id)}
                          >
                            {withdrawing === lead.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4 mr-1" />
                            )}
                            Withdraw
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border grid sm:grid-cols-2 gap-3 text-sm">
                        {(lead as any).full_name && <Detail label="Full Name" value={(lead as any).full_name} />}
                        {(lead as any).date_of_birth && <Detail label="Date of Birth" value={(lead as any).date_of_birth} />}
                        {lead.email && <Detail label="Email" value={lead.email} />}
                        {lead.mobile && <Detail label="Mobile" value={lead.mobile} />}
                        {lead.previous_diagnosis && <Detail label="Diagnosis" value={lead.previous_diagnosis.replace(/_/g, " ")} />}
                        {lead.diagnosis_details && <Detail label="Diagnosis Details" value={lead.diagnosis_details} />}
                        {(lead as any).passport_country && <Detail label="Passport Country" value={(lead as any).passport_country.replace(/_/g, " ")} />}
                        {(lead as any).translation_language && <Detail label="Translation" value={(lead as any).translation_language.replace(/_/g, " ")} />}
                        {(lead as any).virtual_consultation && <Detail label="Virtual Consultation" value={(lead as any).virtual_consultation.replace(/_/g, " ")} />}
                        {(lead as any).allergies_conditions && (lead as any).allergies_conditions.length > 0 && (
                          <Detail label="Allergies/Conditions" value={(lead as any).allergies_conditions.map((a: string) => a.replace(/_/g, " ")).join(", ")} />
                        )}
                        {(lead as any).prescription_url && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground font-medium">Prescription:</span>
                            <a
                              href={(lead as any).prescription_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1"
                            >
                              View <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <Card className="shadow-soft bg-secondary">
        <CardContent className="p-6">
          <h3 className="font-display font-semibold text-foreground mb-3">💡 Quick Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Submit a detailed questionnaire to get the most accurate treatment quotes</li>
            <li>• Compare prices across multiple destinations to find the best value</li>
            <li>• You can withdraw an enquiry at any time if you change your mind</li>
            <li>• Check back regularly — hospitals may update their pricing and availability</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground font-medium">{label}: </span>
      <span className="text-foreground capitalize">{value}</span>
    </div>
  );
}
