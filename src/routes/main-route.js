import { Route } from "react-router-dom";
import ProtectedRoute from "../middleware/protected-route";
// import Home from "../components/home/home";

import WithLogoutButton from "../components/withLogout/withLogout";
import ForgotPassword from "../components/forgot-password/forgot-password";
import QrCode from "../components/qr-code/qr-code";

const routes = (
  <>
    <Route exact element={<ProtectedRoute />}>
      <Route exact path="/" element={<QrCode />} />
      <Route element={<WithLogoutButton />} />
      <Route path="/forgot-password-link" element={<ForgotPassword />} />
    </Route>
  </>
);

export default routes;
