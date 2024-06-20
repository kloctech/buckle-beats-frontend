import { Route } from "react-router-dom";
import ProtectedRoute from "../middleware/protected-route";
// import Home from "../components/home/home";

import WithLogoutButton from "../components/withLogout/withLogout";
import ForgotPassword from "../components/forgot-password/forgot-password";
import Hamburger from "../components/hamburger-searchbar/hamburger-searchbar";
import EditQRCode from "../components/edit-qr-code/edit-qr-code";
import AddQRCode from '../components/add-qr-code/add-qr-code';
import SurveyForm  from "../components/survey-form/survey-form";
import FormAnimation  from "../components/form-animation/form-animation";
import Heart from "../assets/done_heart.gif";

const routes = (
  <>
    <Route exact element={<ProtectedRoute />}>
      <Route exact path="/" element={<Hamburger />} />
      <Route element={<WithLogoutButton />} />
      <Route path="/forgot-password-link" element={<ForgotPassword />} />
      <Route path="/add-qr-code/:id" element={<AddQRCode />} />
      <Route path="/edit-qr-code/:id" element={<EditQRCode />} />
      <Route path="/survey-form" element={<SurveyForm />} />
      <Route path="/result-form" element={<FormAnimation icon={Heart} heading="Your are all set - hooray!" />} />
    </Route>
  </>
);

export default routes;
