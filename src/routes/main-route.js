import { Route } from "react-router-dom";
import ProtectedRoute from "../middleware/protected-route";
// import Home from "../components/home/home";

import WithLogoutButton from "../components/withLogout/withLogout";
import ForgotPassword from "../components/forgot-password/forgot-password";
import Hamburger from "../components/hamburger-searchbar/hamburger-searchbar";
import ManageProfile from "../components/manage-profile/manage-profile";
import EditQRCode from "../components/edit-qr-code/edit-qr-code";
import AddQRCode from '../components/add-qr-code/add-qr-code'
import SendInvite from "../components/send-invite/send-invite";

const routes = (
  <>
    <Route exact element={<ProtectedRoute />}>
      <Route exact path="/" element={<Hamburger />} />
      <Route element={<WithLogoutButton />} />
      <Route path="/forgot-password-link" element={<ForgotPassword />} />
      <Route path="/manage-profile" element={<ManageProfile />} />
      <Route path="/add-qr-code/:id" element={<AddQRCode />} />
      <Route path="/edit-qr-code/:id" element={<EditQRCode />} />
      <Route path = '/send-invite'  element = {<SendInvite/>}/>
    </Route>
  </>
);

export default routes;
