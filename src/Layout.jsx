import React from 'react';
import ChatWidget from './components/ChatWidget';

export default function Layout({ children, currentPageName }) {
  const isAdminPage = currentPageName === 'AdminChat' || currentPageName === 'AdminExport' || currentPageName === 'Dashboard';
  
  return (
    <div>
      {children}
      {!isAdminPage && <ChatWidget />}
    </div>
  );
}