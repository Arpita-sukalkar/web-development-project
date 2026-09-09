import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  return (
    <div className="bg-surface font-sans text-on-surface antialiased min-h-screen">
      <Sidebar />
      <div className="pl-sidebar-width min-h-screen flex flex-col">
        <Header />
        <main className="w-full flex-1 pt-header-height bg-surface px-gutter-desktop py-space-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
