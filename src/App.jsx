/** @format */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import allRoutes from "./Routes/Routes";

const App = () => {
  return (
    <Router>
      <ReactNotifications />
      <MainLayout>
        <Routes>
          {allRoutes.map((routeGroup, index) => {
            const Layout = routeGroup.layout;
            if (Layout) {
              return (
                <Route element={<Layout />} key={`layoutRoute${index}`}>
                  {routeGroup.routes.map((route) => (
                    <Route
                      path={route.path}
                      element={route.element}
                      key={`route${route.path}`}
                    />
                  ))}
                </Route>
              );
            } else {
              return routeGroup.routes.map((route) => (
                <Route
                  path={route.path}
                  element={route.element}
                  key={`route-without-layout${route.path}`}
                />
              ));
            }
          })}
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
