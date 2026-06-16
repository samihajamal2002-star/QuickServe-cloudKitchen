// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
<div>
      <Navbar />
      <main>
        {/* এই Outlet টি অবশ্যই থাকতে হবে */}
        <Outlet /> 
      </main>
    </div>
  );
};
export default Layout;