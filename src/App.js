import React from 'react';
import { Route, Routes } from 'react-router-dom';

//--------------COMPONENTS--------------//

import { PwGenPage } from './Pages/PwGenPage';
import { PwBookPage } from './Pages/PwBookPage';
import { PwBookPersonalPage } from './Pages/PwBookPersonalPage';
import { PwBookSharedPage } from './Pages/PwBookSharedPage';
import { ProfilePage } from './Pages/ProfilePage';
import { OnboardingPage } from './Pages/OnboardingPage';
import { ForgotPwPage } from './Pages/ForgotPwPage';
import { SignUpPage } from './Pages/SignUpPage';
import { ErrorPage } from './Pages/ErrorPage';

//--------------STYLING--------------//
import './App.css';

export const UserContext = React.createContext(null);

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PwGenPage />} />
        <Route path="/passwordbook">
          <Route index element={<PwBookPage />} />
          <Route path="personal" element={<PwBookPersonalPage />} />
          <Route path="shared" element={<PwBookSharedPage />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/forgotpassword" element={<ForgotPwPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
