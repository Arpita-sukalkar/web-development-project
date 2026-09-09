export const NAVIGATION_GROUPS = [
  {
    title: "Main",
    items: [
      { path: "/dashboard", label: "Dashboard", icon: "grid_view" },
      { path: "/patients", label: "Patients", icon: "personal_injury", badgeKey: "patients" },
      { path: "/doctors", label: "Doctors", icon: "stethoscope", badgeKey: "doctors" },
      { path: "/appointments", label: "Appointments", icon: "calendar_clock", badgeKey: "appointments" },
    ],
  },
  {
    title: "Clinical & Wards",
    items: [
      { path: "/admissions", label: "Admissions & Beds", icon: "hotel", badgeKey: "admissions" },
      { path: "/laboratory", label: "Laboratory", icon: "chips", badgeKey: "laboratory" },
      { path: "/pharmacy", label: "Pharmacy", icon: "medication", badgeKey: "pharmacy" },
    ],
  },
  {
    title: "Financial & Management",
    items: [
      { path: "/billing", label: "Billing", icon: "receipt_long", badgeKey: "billing" },
      { path: "/reports", label: "Reports & Analytics", icon: "monitoring" },
      { path: "/staff", label: "Staff", icon: "badge" },
    ],
  },
  {
    title: "System",
    items: [
      { path: "/notifications", label: "Notifications", icon: "notifications", badgeKey: "notifications" },
      { path: "/settings", label: "Settings", icon: "settings" },
      { path: "/logout", label: "Logout", icon: "logout", isDestructive: true },
    ],
  },
];
