import Cookies from 'js-cookie';
import React, { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import { EmailTemplateEditor, Loading } from "../components";
import AuthRoutes from "../components/core-module/auth-routes/AuthRoutes";
import MenuProtectedRoute from '../components/core-module/auth-routes/MenuProtectedRoute';
import HomeNavBar from "../components/core-module/nav-bar/user-home-nav-bar/HomeNavBar";
import { Budget, EmailTemplateViewer, Login, OfferPage, OrganizationsPage, PricingPolicy, Tags, UserList, VoucherPage } from "../pages";
import ApprovalWorkflow from "../pages/approval-workflow-module/ApprovalWorkflow";
import DashboardWrapper from "../pages/dashboard/dashboard-wrapper/DashboardWrapper";
import GoogleAuthCallback from "../pages/login-module/login/ProfileSelection";
import AddNewTraveler from "../pages/my-trips/AddNewTraveler/AddNewTraveler";
import AllTrips from "../pages/my-trips/AllTrips/AllTrips";
import NewTrip from "../pages/my-trips/NewTrip/NewTrip";
import NotAuthorized from '../pages/NotAuthorized';
import NotFound from '../pages/NotFound';
import AddOrganization from "../pages/org-module/add-organization/AddOrganization";
import Policy from "../pages/policy/Policy";
import Roles from "../pages/roles-module/Roles";
import Support from "../pages/support/Support";
import { TagsProvider } from '../pages/tags/context/TagsContext';
import TravelPolicy from "../pages/travel-policy-module/TravelPolicy";
import { ROUTES } from "../utility/constant";
import SearchProvider from "../utility/context/provider/SearchProvider";
import SrpNavBarProvider from "../utility/context/provider/SrpNavBarProvider";
import { LastVisitedProvider, useLastVisited } from "../utility/hooks/LastVisitedContext";
import useTitle from "../utility/hooks/useTitle";
import SamlProfileSelection from '../pages/login-module/login/SamlProfileSelection';

/**
 * The main router component for the application. This component is responsible
 * for rendering the correct page based on the current route.
 *
 * @returns The router component.
 */
const Router: React.FC = (): JSX.Element => {
  const [conversationalWay, setConversationalWay] = React.useState(false);
  useTitle();
  if (!localStorage.getItem("templateValue")) {
    localStorage.setItem("templateValue", '0')
    window.dispatchEvent(new Event("template-change"));
  }
  const isNewTemplate = (localStorage.getItem("templateValue"))
  const jeetatCookie = Cookies.get('jeetat');
  const tokenAccessCookie = jeetatCookie ? JSON.parse(jeetatCookie) : null;

  const isAuth = !!tokenAccessCookie?.token;

  const LoginRoute = () => {
    const { lastVisited } = useLastVisited();
    if (isAuth) {
      return <Navigate to={lastVisited || `${ROUTES.DASHBOARD}?theme=${isNewTemplate}`} replace />;
    }
    return <Login />;
  };

  const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const validPaths = Object.values(ROUTES) as string[];
    const currentPath = location.pathname;

    if (currentPath === '/') {
      if (isAuth) {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
      }
      return <Navigate to={ROUTES.LOGIN} replace />;
    }
    if (
      currentPath !== ROUTES.NOTAUTHORIZED &&
      currentPath !== ROUTES.NOTFOUND &&
      !validPaths.includes(currentPath) && isAuth
    ) {
      return <Navigate to={ROUTES.NOTFOUND} replace />;
    } else if (currentPath !== ROUTES.NOTAUTHORIZED &&
      currentPath !== ROUTES.NOTFOUND &&
      !validPaths.includes(currentPath) && !isAuth) {
      return <Navigate to={ROUTES.LOGIN} replace />;
    }
    return <>{children}</>;
  };

  return (
    <LastVisitedProvider>
      <SearchProvider>
        <SrpNavBarProvider>
          <Suspense fallback={<Loading />}>
            <RouteGuard>
              <Routes>
                {/* 🔒 Protected Routes */}
                <Route element={<AuthRoutes />}>
                  {/* Routes wrapped with HomeNavBar */}
                  <Route
                    element={
                      <HomeNavBar
                        setConversationalWay={setConversationalWay}
                        conversationalWay={conversationalWay}
                      />
                    }
                  >
                    {/* Home/Dashboard route should be accessible to all authenticated users */}
                    <Route path={ROUTES.DASHBOARD} element={<DashboardWrapper conversationalWay={conversationalWay} />} />
                    {/* The rest remain protected by MenuProtectedRoute */}
                    <Route element={<MenuProtectedRoute menuId="Roles & Permissions" />}>
                      <Route path={ROUTES.ROLES} element={<Roles />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Users" />}>
                      <Route path={ROUTES.USER} element={<UserList />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Organisations" />}>
                      <Route path={ROUTES.ADDORG} element={<AddOrganization />} />
                    </Route>
                    {/* Temporarily bypass authorization for Organizations page */}
                    <Route path={ROUTES.ORGANIZATIONS} element={<OrganizationsPage />} />
                    <Route element={<MenuProtectedRoute menuId="Email Template" />}>
                      <Route path={ROUTES.EMAILTEMPLATE} element={<EmailTemplateViewer />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Email Template Editor" />}>
                      <Route path={ROUTES.EMAILTEMPLATEEDITOR} element={<EmailTemplateEditor />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Edit User" />}>
                      <Route path={ROUTES.EDITUSER} element={<UserList />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Add User" />}>
                      <Route path={ROUTES.ADDUSER} element={<UserList />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Trips" />}>
                      <Route path={ROUTES.TRIPS} element={<AllTrips />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Trips" />}>
                      <Route path={ROUTES.NEWTRIP} element={<NewTrip />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Trips" />}>
                      <Route path={ROUTES.ADDNEWTRAVELER} element={<AddNewTraveler />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Travel Policy" />}>
                      <Route path={ROUTES.TRAVEL_POLICY} element={<TravelPolicy />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Pricing Policy" />}>
                      <Route path={ROUTES.PRICING_POLICY} element={<PricingPolicy />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Approval Workflow" />}>
                      <Route path={ROUTES.APPROVALWORKFLOW} element={<ApprovalWorkflow />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Policy" />}>
                      <Route path={ROUTES.POLICY} element={<Policy />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Support" />}>
                      <Route path={ROUTES.SUPPORT} element={<Support />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Tags" />}>
                      <Route path={ROUTES.TAGS} element={<TagsProvider><Tags /></TagsProvider>} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Vouchers" />}>
                      <Route path={ROUTES.VOUCHER} element={<VoucherPage />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Offers" />}>
                      <Route path={ROUTES.OFFER} element={<OfferPage />} />
                    </Route>
                    <Route element={<MenuProtectedRoute menuId="Budget" />}>
                      <Route path={ROUTES.BUDGET} element={<Budget />} />
                    </Route>
                  </Route>
                </Route>

                {/* Not Authorized Route */}
                <Route path={ROUTES.NOTAUTHORIZED} element={<NotAuthorized />} />
                <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
                {/* Fallback for any unknown route */}
                <Route path="*" element={<NotFound />} />
                {/* 🔓 Public Routes */}
                <Route path={ROUTES.LOGIN} element={<LoginRoute />} />
                <Route path={ROUTES.CALLBACK} element={<GoogleAuthCallback />} />
                {/* <Route path={ROUTES.TRAVEL_POLICY} element={<TravelPolicy />} /> */}
                <Route path={ROUTES.SAMLCALLBACK} element={<SamlProfileSelection />} />
                {/* <Route path={ROUTES.TRAVEL_POLICY} element={<TravelPolicy />} /> */}
              </Routes>
            </RouteGuard>
          </Suspense>
        </SrpNavBarProvider>
      </SearchProvider>
    </LastVisitedProvider>
  );
};

export default Router;
