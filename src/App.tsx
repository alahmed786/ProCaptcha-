/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Legal } from "./pages/Legal";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { LogProvider } from "./context/LogContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <LogProvider>
        <AuthProvider>
          <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
      </LogProvider>
    </ThemeProvider>
  );
}
