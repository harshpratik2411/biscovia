import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cookie, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
    const body = isLogin 
      ? { email: e.target.email.value, password: e.target.password.value }
      : { name: e.target.name.value, email: e.target.email.value, password: e.target.password.value };

    try {
      const response = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          login(data.token);
          navigate('/');
        } else {
          setIsLogin(true);
          alert('Registration successful! Please login.');
        }
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5e4cf] flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#d3a971]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#3d2510]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-[#f9e7cf] rounded-[2.5rem] shadow-[0_20px_50px_rgba(61,37,16,0.15)] overflow-hidden">
          <div className="bg-[#3d2510] p-8 text-center text-[#f5e4cf]">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#f5e4cf] text-[#3d2510] mb-4"
            >
              <Cookie className="h-8 w-8" />
            </motion.div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isLogin ? 'Welcome Back!' : 'Join Biskovia'}
            </h1>
            <p className="text-[#f5e4cf]/70 text-sm mt-1">
              {isLogin ? 'Login to continue your cookie journey' : 'Create an account to start ordering'}
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3d2510]/70 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3d2510]/40" />
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full bg-[#f5e4cf] border border-[#d3a971]/30 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#3d2510] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3d2510]/70 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3d2510]/40" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-[#f5e4cf] border border-[#d3a971]/30 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#3d2510] transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3d2510]/70 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3d2510]/40" />
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full bg-[#f5e4cf] border border-[#d3a971]/30 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#3d2510] transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3d2510] text-[#f5e4cf] rounded-2xl py-3.5 font-bold text-sm shadow-lg shadow-[#3d2510]/20 hover:bg-[#2b180b] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6"
              >
                {loading ? 'Processing...' : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-semibold text-[#3d2510] hover:underline underline-offset-4"
              >
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6">
          <Link to="/" className="text-xs font-bold text-[#3d2510]/60 hover:text-[#3d2510]">HOME</Link>
          <Link to="/menu" className="text-xs font-bold text-[#3d2510]/60 hover:text-[#3d2510]">MENU</Link>
          <Link to="/contact" className="text-xs font-bold text-[#3d2510]/60 hover:text-[#3d2510]">SUPPORT</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
