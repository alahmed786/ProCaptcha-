/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Pricing } from "./pages/Pricing";
import { Contact } from "./pages/Contact";
import { Legal } from "./pages/Legal";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { Dashboard } from "./pages/Dashboard";
import { DashboardOverview } from "./pages/DashboardOverview";
import { Notifications } from "./pages/Notifications";
import { Captcha } from "./pages/Captcha";
import { Account } from "./pages/Account";
import { History } from "./pages/History";
import { Auth } from "./pages/Auth";
import { GetKey } from "./pages/GetKey";
import { Leaderboard } from "./pages/Leaderboard";
import { Debug } from "./pages/Debug";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { LogProvider } from "./context/LogContext";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";

export default function App() {
  return (
    <LogProvider>
      <AuthProvider>
        <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsOfService />} />
              <Route path="login" element={<Auth />} />
              <Route path="get-key" element={<GetKey />} />
              <Route path="debug" element={<Debug />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />}>
                  <Route index element={<DashboardOverview />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="captcha" element={<Captcha />} />
                  <Route path="account" element={<Account />} />
                  <Route path="history" element={<History />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route path="*" element={<DashboardOverview />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
    </LogProvider>
  );
}
