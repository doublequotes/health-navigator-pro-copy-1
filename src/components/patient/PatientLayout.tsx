import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Home, FileText, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatientLayout() {
  const { user, loading, role, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (role && role !== "patient") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">You don't have patient access.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 flex items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-6">
          <Link to="/patient" className="font-display font-bold text-lg text-foreground">MedVoyage</Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/patient" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary">
              <Home className="h-4 w-4 inline mr-1" /> Dashboard
            </Link>
            <Link to="/questionnaire" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary">
              <FileText className="h-4 w-4 inline mr-1" /> Get Quote
            </Link>
          </nav>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-1" /> Sign Out
        </Button>
      </header>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
