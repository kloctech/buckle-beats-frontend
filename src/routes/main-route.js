import { Route } from "react-router-dom";
import ProtectedRoute from "../middleware/protected-route";
import Home from "../components/home/home";

const routes = (
  <>
    <Route exact element={<ProtectedRoute />}>
      <Route exact path="/" element={<Home />} />
    </Route>
  </>
);

export default routes;
