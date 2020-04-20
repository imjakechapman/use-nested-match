import * as React from "react";
import classnames from "classnames";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
  NavLink,
  useParams,
  useLocation
} from "react-router-dom";

// useNestedMatch
import { useNestedMatch } from "../../src";

function Example() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/*" element={<DashboardContainer />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="galleries/*" element={<GalleriesLayout />}>
              <Route path="/" element={<GalleriesList />} />
              <Route path=":gallery_id" element={<GalleryEdit />} />
            </Route>
            <Route path="account/*" element={<AccountLayout />}>
              <Route path="/" element={<AccountView />} />
              <Route path="subscription" element={<SubscriptionView />} />
            </Route>
            <Route path="settings" element={<SettingsView />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

const DashboardContainer = () => {
  const { pathname } = useLocation();
  const galleriesLinkActive = useNestedMatch("galleries", "startsWith", pathname);
  const accountLinkActive = useNestedMatch("account", "startsWith", pathname);

  return (
    <div className="w-full">
      <div className="static">
        <nav className="absolute top-0 right-0 bg-gray-200 z-10">
          <NavLink
            className={classnames(
              { "border-red-500": galleriesLinkActive },
              "text-md border-b-2 inline-block p-2"
            )}
            to="galleries"
          >
            <svg height="0" width="0" className="styleMeIfNavLinkIsActive" />
            Galleries
          </NavLink>
          <NavLink
            className="text-md border-b-2 inline-block p-2"
            to="settings"
            activeClassName="border-red-500"
          >
            <svg height="0" width="0" className="styleMeIfNavLinkIsActive" />
            Settings
          </NavLink>
          <NavLink
            className={classnames(
              { "border-red-500": accountLinkActive },
              "text-md border-b-2 inline-block p-2"
            )}
            to="account"
          >
            <svg height="0" width="0" className="styleMeIfNavLinkIsActive" />
            Account
          </NavLink>
        </nav>
      </div>

      <div className="p-5 pt-20">
        <Outlet />
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div>
      <p className="text-md text-gray-500">Dashboard</p>
    </div>
  );
};

const GalleriesLayout = () => (
  <div>
    <p className="text-xl text-gray-800">Galleries Page</p>
    <Outlet />
  </div>
);

const GalleriesList = () => {
  return (
    <ul className="mt-3">
      <li className="p-3 border rounded flex flex-row justify-between">
        <p>Sample Gallery Title</p>
        <Link
          to="192481040"
          className="inline-block rounded bg-gray-200 px-2 text-xs text-gray-600 flex flex-col items-center justify-center hover:bg-gray-300"
        >
          edit
        </Link>
      </li>
    </ul>
  );
};

const GalleryEdit = () => {
  const { gallery_id } = useParams();
  return (
    <div className="py-5">
      <p className="text-md text-gray-800">Editing Gallery: {gallery_id}</p>
    </div>
  );
};

const SettingsView = () => {
  return (
    <div className="p-2">
      <p className="text-xl text-gray-800">Settings</p>
      <p>No nested router stuff here silly...</p>
    </div>
  );
};

const AccountLayout = () => (
  <div>
    <p className="text-xl text-gray-800">Account Details</p>
    <nav className="bg-gray-100 mt-2">
      <NavLink
        className="text-md border-b-2 inline-block p-2"
        to="/account"
        activeClassName="border-red-500"
      >
        <svg height="0" width="0" className="styleMeIfNavLinkIsActive" />
        Details
      </NavLink>
      <NavLink
        className="text-md border-b-2 inline-block p-2"
        to="subscription"
        activeClassName="border-red-500"
      >
        <svg height="0" width="0" className="styleMeIfNavLinkIsActive" />
        Subscription
      </NavLink>
    </nav>
    <Outlet />
  </div>
);

const AccountView = () => {
  return (
    <div className="mt-5">
      <p className="text-md text-gray-800">User details here...</p>
    </div>
  );
};

const SubscriptionView = () => {
  return (
    <div className="py-3">
      <p className="text-md text-gray-800">Subscription Details here...</p>
    </div>
  );
};


export { Example }