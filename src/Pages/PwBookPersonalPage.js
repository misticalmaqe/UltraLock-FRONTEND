// PwBookPersonalPage.js
import { useState } from 'react';
import { Navbar } from '../Components/NavBar';
import Header from '../Components/Header';

export function PwBookPersonalPage() {
  //state for header
  const personalShared = false;

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-background">
      <Header toggle={personalShared} />
      <Navbar />
    </div>
  );
}
