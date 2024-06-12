import { Route } from "react-router-dom";
import ProtectedRoute from "../middleware/protected-route";
// import Home from "../components/home/home";

import WithLogoutButton from "../components/withLogout/withLogout";
import ForgotPassword from "../components/forgot-password/forgot-password";
import Hamburger from "../components/hamburger-searchbar/hamburger-searchbar";
import LostQRCode from "../components/lost-qrcode/lost-qrcode";

const routes = (
  <>
    <Route exact element={<ProtectedRoute />}>
      <Route exact path="/" element={<Hamburger />} />
      <Route element={<WithLogoutButton />} />
      <Route path="/forgot-password-link" element={<ForgotPassword />} />
      <Route path="/id" element={<LostQRCode />} />
    </Route>
  </>
);

export default routes;
