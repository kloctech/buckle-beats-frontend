import { Route } from "react-router-dom";
import ProtectedRoute from "../middleware/protected-route";
// import Home from "../components/home/home";
import DesktopProtectedPage from "../components/desktop-protected-page/desktop-protected-page";

import WithLogoutButton from "../components/withLogout/withLogout";

const DesktopRoutes = (
  <>
    <Route exact element={<ProtectedRoute />}>
    <Route exact path="/" element={<DesktopProtectedPage />} />
    <Route element={<WithLogoutButton />} />
    <Route path="/forgot-password-link" element={<DesktopProtectedPage />} />
      <Route path="/manage-profile" element={<DesktopProtectedPage />} />
      <Route path="/add-qr-code/:id" element={<DesktopProtectedPage />} />
      <Route path="/edit-qr-code/:id" element={<DesktopProtectedPage />} />
      <Route path="/qr-scanner" element={<DesktopProtectedPage />} />
      <Route path="/send-invite" element={<DesktopProtectedPage />} />
      <Route path="/survey-form" element={<DesktopProtectedPage />} />
    </Route>
  </>
);

export default DesktopRoutes;