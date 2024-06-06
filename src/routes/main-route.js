import { Route } from "react-router-dom";
import ProtectedRoute from "../middleware/protected-route";
// import Home from "../components/home/home";
import Hamburger from "../components/hamburger-searchbar/hamburger-searchbar";
import WithLogoutButton from "../components/withLogout/withLogout";

const routes = (
  <>
    <Route exact element={<ProtectedRoute />}>
      <Route exact path="/" element={<Hamburger />} />
      <Route element={<WithLogoutButton />} />
    </Route>
  </>
);

export default routes;
