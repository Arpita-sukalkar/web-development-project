import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('dr.chen');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('DOCTOR');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ username, password });
      navigate(from, { replace: true });
    } catch (err) {
      if (!err.response) {
        setError('Cannot connect to backend server. Please verify backend is running on port 8085.');
      } else {
        setError(err.response?.data?.message || 'Invalid username or password. Please verify your clinical credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (userType) => {
    if (userType === 'admin') {
      setUsername('admin');
      setPassword('admin123');
      setRole('ADMIN');
    } else if (userType === 'arpita') {
      setUsername('Arpita');
      setPassword('password123');
      setRole('DOCTOR');
    } else {
      setUsername('dr.chen');
      setPassword('password123');
      setRole('DOCTOR');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-space-base sm:p-space-xl">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30">
        {/* Ambient Blur Accents */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-fixed-dim/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl p-space-base sm:p-space-xl lg:p-space-2xl">
          {/* Left Column: Hospital Brand & System Security Statement */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-space-xl">
            <div className="space-y-space-lg">
              {/* Branding */}
              <div className="flex items-center gap-space-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container-lowest shadow-sm p-1.5 border border-outline-variant/30">
                  <img
                    alt="CarePulse HMS Logo"
                    className="h-full w-full object-contain"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1WBS8bPcyU0DEO3GvuabCCGWKib9P2c8wJZWZ7yowQTZgPtws9Xyqo57hIrUa6oX-eA5elfmKchTjFbM9z0dTeMn34dQ5YAwmTrQo0l42kaXzpnMiXUOk_EDrG8by4BgheWqo-gWQBzyvFN41jq0WskTot9y5pM3kGSV-5WrUivqSFCMfuoISzf36pviIS3rnLgQP-r-fZmnh6srj86GWXBJ6kEaHGVcgGH_K7Ld37XwzSnkwTugwFsdoc"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">CarePulse HMS</span>
                  <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wider">Enterprise Clinical Portal</span>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center gap-space-2xs rounded-full bg-surface-container-highest px-space-sm py-0.5 text-primary font-caption text-caption font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span>
                  v4.18 Certified
                </span>
              </div>

              {/* Headline & Clinical Purpose */}
              <div className="space-y-space-xs">
                <div className="inline-flex items-center gap-space-xs rounded-full bg-secondary-container/60 px-space-sm py-0.5 text-on-secondary-container font-caption text-caption font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  St. Jude General Medical Center · Level 1 Trauma Hub
                </div>
                <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
                  Clinical Access Terminal
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  HIPAA & HITECH compliant gateway. Authenticate to manage inpatient admissions, pharmacy dispersion, digital health charts, and critical emergency alarms.
                </p>
              </div>

              {/* Telemetry Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                <div className="rounded-lg bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/30">
                  <div className="flex items-center justify-between text-secondary mb-space-2xs">
                    <span className="material-symbols-outlined text-[20px]">monitor_heart</span>
                    <span className="font-caption text-caption text-secondary font-semibold">Live 99.98%</span>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-bold">Ward Telemetry</div>
                  <div className="font-caption text-caption text-on-surface-variant">Active synchronized nodes</div>
                </div>

                <div className="rounded-lg bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/30">
                  <div className="flex items-center justify-between text-primary mb-space-2xs">
                    <span className="material-symbols-outlined text-[20px]">security</span>
                    <span className="font-caption text-caption text-primary font-semibold">FIPS 140-3</span>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-bold">Zero Trust EMR</div>
                  <div className="font-caption text-caption text-on-surface-variant">Hardware keystore validation</div>
                </div>
              </div>
            </div>

            {/* Quick Fill Credentials Utility */}
            <div className="pt-space-md border-t border-surface-container-high/60">
              <span className="font-caption text-caption uppercase text-outline font-semibold block mb-2">
                Quick Demo Credentials:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoFill('arpita')}
                  className="px-space-sm py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-emerald-600 font-caption text-caption font-semibold transition-colors"
                >
                  Doctor: Arpita / password123
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('doctor')}
                  className="px-space-sm py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-primary font-caption text-caption font-semibold transition-colors"
                >
                  Doctor: dr.chen / password123
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('admin')}
                  className="px-space-sm py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-tertiary font-caption text-caption font-semibold transition-colors"
                >
                  Admin: admin / admin123
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Form */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="rounded-xl bg-surface-container-lowest p-space-lg sm:p-space-xl shadow-lg border border-outline-variant/30">
              <div className="mb-space-lg">
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Physician & Staff Sign In</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Enter your credentials to enter the clinical terminal
                </p>
              </div>

              {error && (
                <div className="mb-space-md p-space-sm rounded-lg bg-error-container text-on-error-container text-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-[18px]">error</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-space-md">
                {/* Role / Department Selection */}
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">Role Classification</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                  >
                    <option value="DOCTOR">Attending Physician / Surgeon</option>
                    <option value="ADMIN">Hospital Administration</option>
                    <option value="NURSE">Head Nurse / Ward Supervisor</option>
                    <option value="PHARMACIST">Lead Pharmacist</option>
                  </select>
                </div>

                {/* Username / Clinical ID */}
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">Clinical ID / Username</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">badge</span>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. dr.chen or admin"
                      className="w-full h-10 pl-9 pr-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-label-sm text-label-sm font-semibold text-on-surface">Terminal Passcode</label>
                    <span className="text-primary hover:underline font-caption text-caption cursor-pointer">
                      Forgot credentials?
                    </span>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">lock</span>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-10 pl-9 pr-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-space-xs disabled:opacity-50"
                >
                  {loading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">login</span>
                      <span>Authenticate Clinical Session</span>
                    </>
                  )}
                </button>

                {/* Register Link */}
                <div className="pt-2 text-center">
                  <span className="text-body-sm text-on-surface-variant">New medical staff or physician? </span>
                  <Link
                    to="/register"
                    className="font-semibold text-primary hover:underline text-body-sm inline-flex items-center gap-0.5"
                  >
                    <span>Register New Account</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </form>

              <div className="mt-space-md pt-space-sm text-center border-t border-surface-container-low text-caption text-on-surface-variant">
                Session activity is audited and logged in compliance with HIPAA Title II.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
