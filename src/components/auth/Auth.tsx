import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNotifications } from '../../hooks/useNotifications';
import { Mail, Lock, ToggleLeft as Google, UserPlus } from 'lucide-react';
import { PasswordValidator } from './PasswordValidator';

type AuthMode = 'signin' | 'signup';

export function Auth() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const validatePassword = (password: string): boolean => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);

      if (mode === 'signup') {
        if (!validatePassword(password)) {
          showError('La contraseña no cumple con los requisitos mínimos');
          return;
        }

        const { data: existingUsers } = await supabase
          .from('auth.users')
          .select('email')
          .eq('email', email)
          .single();

        if (existingUsers) {
          showError('Este correo ya está registrado');
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });

        if (signUpError) throw signUpError;
        showSuccess('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          if (signInError.message.includes('Invalid login credentials')) {
            throw new Error('Correo o contraseña incorrectos');
          }
          throw signInError;
        }
        showSuccess('¡Inicio de sesión exitoso!');
      }
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Error en la autenticación');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {mode === 'signin' ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta'}
          </h2>
        </div>
        
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cultural-escenicas hover:bg-cultural-escenicas/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cultural-escenicas"
        >
          <Google className="w-5 h-5 mr-2" />
          Continuar con Google
        </button>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              O continúa con email
            </span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleEmailAuth}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-cultural-escenicas focus:border-cultural-escenicas focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                  placeholder="Email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-cultural-escenicas focus:border-cultural-escenicas focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                  placeholder="Contraseña"
                />
              </div>
            </div>
          </div>

          {mode === 'signup' && <PasswordValidator password={password} />}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cultural-escenicas hover:bg-cultural-escenicas/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cultural-escenicas"
            >
              {loading ? 'Cargando...' : mode === 'signin' ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-sm text-cultural-escenicas hover:text-cultural-escenicas/90"
            >
              {mode === 'signin' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}