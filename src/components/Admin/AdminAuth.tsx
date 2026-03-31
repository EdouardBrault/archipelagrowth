import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { supabaseUntyped as supabase } from "@/integrations/supabase/untyped-client";
import { User, Session } from '@supabase/supabase-js';
import { LogOut, Loader2 } from 'lucide-react';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth = ({ children }: AdminAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(async () => {
            try {
              const { data: adminCheck, error } = await supabase.rpc('is_current_user_admin' as any);
              if (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
              } else {
                setIsAdmin(adminCheck || false);
              }
              setIsAuthenticated(!!session?.user);
            } catch (error) {
              console.error('Error in admin check:', error);
              setIsAdmin(false);
              setIsAuthenticated(false);
            }
          }, 0);
        } else {
          setIsAdmin(false);
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          toast({ title: "Erreur de connexion", description: error.message, variant: "destructive" });
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin-dashboard` }
        });
        if (error) {
          toast({ title: "Erreur d'inscription", description: error.message, variant: "destructive" });
        } else {
          toast({ title: "Inscription réussie", description: "Vérifiez votre email pour confirmer votre compte" });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({ title: "Erreur", description: "Une erreur est survenue", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Erreur", description: "Erreur lors de la déconnexion", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0043F1]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src="/lovable-uploads/archipelagrowth-logo.png" alt="ArchipelaGrowth" className="h-8 mx-auto mb-6" />
            <h1 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-1">
              Administration
            </h1>
            <p className="text-sm text-[#010D3E]/50 font-inter">
              {isLogin ? 'Connectez-vous à votre espace' : 'Créer un compte administrateur'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#010D3E]/70 text-xs font-inter font-medium uppercase tracking-wide">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-white border-[#E5E7EB] text-[#010D3E] font-inter placeholder:text-[#010D3E]/30 focus-visible:ring-[#0043F1]/20 focus-visible:border-[#0043F1]"
                placeholder="admin@archipelmarketing.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-[#010D3E]/70 text-xs font-inter font-medium uppercase tracking-wide">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-white border-[#E5E7EB] text-[#010D3E] font-inter placeholder:text-[#010D3E]/30 focus-visible:ring-[#0043F1]/20 focus-visible:border-[#0043F1]"
                placeholder="••••••••"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-medium rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                isLogin ? 'Se connecter' : "S'inscrire"
              )}
            </Button>
            <button
              type="button"
              className="w-full text-center text-sm text-[#0043F1] font-inter hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Créer un compte' : 'Déjà un compte ? Se connecter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-xl">✕</span>
          </div>
          <h1 className="font-jakarta text-xl font-bold text-[#010D3E] mb-2">Accès refusé</h1>
          <p className="text-sm text-[#010D3E]/50 font-inter mb-6">
            Vous n'avez pas les permissions administrateur.
          </p>
          <Button onClick={handleLogout} variant="outline" className="border-[#E5E7EB] text-[#010D3E]/70 hover:bg-[#F3F4F6] font-inter">
            Se déconnecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Top bar */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/lovable-uploads/archipelagrowth-logo.png" alt="ArchipelaGrowth" className="h-6" />
            <span className="text-[#010D3E]/30 font-inter text-sm">|</span>
            <span className="text-[#010D3E]/50 font-inter text-sm">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#010D3E]/40 font-inter text-xs hidden sm:block">{user?.email}</span>
            <Button 
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-[#010D3E]/50 hover:text-[#010D3E] hover:bg-[#F3F4F6] font-inter text-xs gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};

export default AdminAuth;
