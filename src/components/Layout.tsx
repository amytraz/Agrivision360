
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  onLoginClick?: () => void;
}

const Layout = ({ onLoginClick }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onLoginClick={onLoginClick} />
      <main className="flex-grow pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
