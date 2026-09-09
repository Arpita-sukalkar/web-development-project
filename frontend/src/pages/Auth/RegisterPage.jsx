import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    role: 'DOCTOR',
    department: 'Cardiology',
    title: 'Attending Physician',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passcodes do not match. Please verify your entries.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Passcode must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await register({
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        role: formData.role,
        department: formData.department,
        title: formData.title.trim(),
        password: formData.password,
      });

      navigate('/dashboard', { replace: true });
    } catch (err) {
      if (!err.response) {
        setError('Cannot reach the backend server. Ensure backend is running on port 8085.');
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please review your details and try again.');
      }
    } finally {
      setLoading(false);
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
          <div className="lg:col-span-5 flex flex-col justify-between space-y-space-xl">
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
              </div>

              {/* Headline & Clinical Purpose */}
              <div className="space-y-space-xs">
                <div className="inline-flex items-center gap-space-xs rounded-full bg-secondary-container/60 px-space-sm py-0.5 text-on-secondary-container font-caption text-caption font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Clinical Staff Enrollment
                </div>
                <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
                  New Staff Registration
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Enroll as an attending physician, surgical specialist, administrative director, or clinical team member into the CarePulse Zero-Trust EMR network.
                </p>
              </div>

              {/* Enrollment Benefits */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[22px]">badge</span>
                  <div>
                    <div className="text-body-sm font-semibold text-on-surface">Automated Clinical Directory</div>
                    <div className="text-caption text-on-surface-variant">Instant entry into doctor directory, patient assignment, and ward rounds.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
                  <span className="material-symbols-outlined text-secondary text-[22px]">lock_person</span>
                  <div>
                    <div className="text-body-sm font-semibold text-on-surface">Role-Based Terminal Access</div>
                    <div className="text-caption text-on-surface-variant">HIPAA audited cryptographic sessions tailored to your medical privileges.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Login */}
            <div className="pt-space-md border-t border-surface-container-high/60">
              <span className="text-caption text-on-surface-variant block mb-1">Already registered clinical personnel?</span>
              <Link
                to="/login"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline text-body-sm"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Return to Physician & Staff Sign In</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="rounded-xl bg-surface-container-lowest p-space-lg sm:p-space-xl shadow-lg border border-outline-variant/30">
              <div className="mb-space-md">
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Create Clinical Profile</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Complete your credential profile to begin clinical workflows
                </p>
              </div>

              {error && (
                <div className="mb-space-md p-space-sm rounded-lg bg-error-container text-on-error-container text-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-[18px]">error</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-space-sm">
                {/* Full Name & Clinical ID (Username) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm font-semibold text-on-surface">Full Name & Title</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">person</span>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Jane Smith, MD"
                        className="w-full h-10 pl-9 pr-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm font-semibold text-on-surface">Clinical ID / Username</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">badge</span>
                      <input
                        type="text"
                        name="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="e.g. j.smith"
                        className="w-full h-10 pl-9 pr-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">Hospital Work Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">mail</span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. j.smith@carepulse-hms.org"
                      className="w-full h-10 pl-9 pr-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                {/* Role Classification & Department */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm font-semibold text-on-surface">Role Classification</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                    >
                      <option value="DOCTOR">Attending Physician / Surgeon</option>
                      <option value="ADMIN">Hospital Administration</option>
                      <option value="NURSE">Head Nurse / Ward Supervisor</option>
                      <option value="PHARMACIST">Lead Pharmacist</option>
                      <option value="LAB_TECH">Lab Specialist</option>
                      <option value="BILLING">Billing Officer</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm font-semibold text-on-surface">Department / Specialty</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Trauma Emergency">Trauma Emergency</option>
                      <option value="Administration">Hospital Administration</option>
                      <option value="Pharmacy">Pharmacy Services</option>
                      <option value="Pathology & Lab">Pathology & Lab</option>
                    </select>
                  </div>
                </div>

                {/* Position Title */}
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">Professional Designation / Title</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">medical_services</span>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Attending Physician / Surgeon"
                      className="w-full h-10 pl-9 pr-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm font-semibold text-on-surface">Terminal Passcode</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">lock</span>
                      <input
                        type="password"
                        name="password"
                        required
                        minLength={6}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min 6 chars"
                        className="w-full h-10 pl-9 pr-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm font-semibold text-on-surface">Confirm Passcode</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">check_circle</span>
                      <input
                        type="password"
                        name="confirmPassword"
                        required
                        minLength={6}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter passcode"
                        className="w-full h-10 pl-9 pr-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-space-xs disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Enrolling Clinical Account...</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                        <span>Complete Clinical Registration</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-space-md pt-space-xs text-center border-t border-surface-container-low text-caption text-on-surface-variant">
                Credentials and privileges are cryptographically issued in accordance with HIPAA standards.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
