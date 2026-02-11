import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Clock } from "lucide-react";

export default function HospitalDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ leads: 0, responded: 0, pending: 0 });

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: assignments } = await supabase
        .from("lead_hospitals")
        .select("status");

      if (assignments) {
        setStats({
          leads: assignments.length,
          responded: assignments.filter((a) => a.status === "responded").length,
          pending: assignments.filter((a) => a.status === "pending").length,
        });
      }
    };
    load();
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Hospital Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Assigned Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Responded</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.responded}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
