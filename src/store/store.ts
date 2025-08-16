import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { musafirAclApi } from "./musafirAclApi";
import { musafirAncillariesBaggageApi } from "./musafirAncillariesBaggageApi";
import { musafirApi } from "./musafirApi";
import { musafirApprovalApi } from "./musafirAprrovalWorkFlow";
import { musafirFlightAncillariesMealsApi } from "./musafirFlightAncillariesMealsApi";
import { musafirFlightAncillariesSeatsApi } from "./musafirFlightAncillariesSeatsApi";
import { musafirFlightBookingDetailsApi } from "./musafirFlightBookingDetailsApi";
import { musafirFlightCheckoutReserveApi } from "./musafirFlightCheckoutReserveApi";
import { musafirFlightListApi } from "./musafirFlightListApi";
import { musafirFlightLookupApi } from "./musafirFlightLookupApi";
import { musafirFlightSelectApi } from "./musafirFlightSelectApi";
import { musafirGroupTest } from "./musafirGroupTest";
import { musafirHomePageApi } from "./musafirHomePageApi";
import { musafirLoginApi } from "./musafirLoginApi";
import { musafirLookupApi } from "./musafirLookupApi";
import { musafirMarketApi } from "./musafirMarketApi";
import { musafirMyTripsApi } from "./musafirMyTripsApi";
import { musafirNotificationApi } from "./musafirNotificationApi";
import {musafirVoucherApi} from "./musafirVoucherApi";
import {musafirOfferApi} from "./musafirOfferAPi";
import { musafirOrgApi } from "./musafirOrgApi";
import { musafirPaymentApi } from "./musafirPaymentApi";
import { musafirRolesApi } from "./musafirRolesApi";
import { musafirTagsApi } from "./musafirTagsApi";
import { musafirOrganizationApi } from "./musafirOrganizationApi";
import { musafirTravelPolicyApi } from "./musafirTravelPolicyApi";
import { musafirUserApi } from "./musafirUserApi";
import { aclSlice } from "./slice/AclSlice";
import { flightAutoSearchgqlReducerApi } from "./slice/AirportAutoCompletegqlSlice";
import { ancillariesSelectionsSlice } from "./slice/AncillariesSelectionsSlice";
import { approvalWorkFlowSlice } from "./slice/ApprovalWorkFlowSlice";
import { approversSearchAutoCompletegqlReducerApi } from "./slice/ApproversSearchApigqlSlice";
import { tagReducerApi } from "./slice/AutoCompleteTagSearch";
import { tripReducerApi } from "./slice/AutoCompleteTripSearch";
// import { approvalAutoSearchgqlReducerApi } from "./slice/ApprovalAutoCompletegqlSlice";
import { FlightAncillariesBaggageApiSlice } from "./slice/FlightAncillariesBaggagesSlice";
import { FlightAncillariesMealsApiSlice } from "./slice/FlightAncillariesMealsSlice";
import { FlightAncillariesSeatsApiSlice } from "./slice/FlightAncillariesSeatsApiSlice";
import { FlightBookingDetailsSlice } from "./slice/FlightBookingDetailsSlice";
import { flightCheckoutReserveSlice } from "./slice/FlightCheckoutReserveSlice";
import { flightListSlice } from "./slice/FlightListSlice";
import { flightLookupSlice } from "./slice/FlightLookupslice";
import { flightSearchSlice } from "./slice/FlightSearchSlice";
import { flightSelectSlice } from "./slice/FlightSelectSlice";
import { loginSlice } from "./slice/LoginSlice";
import { lookupSlice } from "./slice/LookupSlice";
import { marketSlice } from "./slice/MarketSlice";
import { myTripsSlice } from "./slice/myTripsSlice";
import { notificationSlice } from "./slice/NotificationSlice";
import { orgSlice } from "./slice/OrgSlice";
import { policyConstraintSearchReducerApi } from "./slice/PolicyConstraintSearchSlice";
import quotationSlice from "./slice/QuotationSlice";
import { rolesSlice } from "./slice/RoleSlice";
import { tagCreationDataSlice } from "./slice/TagCreationDataSlice";
import { tagsSlice } from "./slice/TagsSlice";
import { userSlice } from "./slice/UserSlice";
import { selectValueSlice } from "./slice/SelectValueSlice";
import { budgetSlice } from "./slice/BudgetSlice";
import { musafirBudgetsApi } from "./MusafirBudgetsApi";
import { musafirPricingPolicyApi } from "./musafirPricingPolicyApi";
import { pricingPolicySlice } from "./slice/PricingPolicySlice";
import { musafirGoogleLocationApi } from "./musafirGoogleLocationApi";
import menuReducer from './slice/MenuSlice';

const appReducer = combineReducers({
  [musafirApi.reducerPath]: musafirApi.reducer,
  [musafirMarketApi.reducerPath]: musafirMarketApi.reducer,
  [musafirRolesApi.reducerPath]: musafirRolesApi.reducer,
  [musafirUserApi.reducerPath]: musafirUserApi.reducer,
  [musafirLoginApi.reducerPath]: musafirLoginApi.reducer,
  [musafirLookupApi.reducerPath]: musafirLookupApi.reducer,
  [musafirOrgApi.reducerPath]: musafirOrgApi.reducer,
  [musafirNotificationApi.reducerPath]: musafirNotificationApi.reducer,
  [musafirFlightLookupApi.reducerPath]: musafirFlightLookupApi.reducer,
  [musafirFlightListApi.reducerPath]: musafirFlightListApi.reducer,
  [musafirFlightSelectApi.reducerPath]: musafirFlightSelectApi.reducer,
  [musafirFlightCheckoutReserveApi.reducerPath]:
    musafirFlightCheckoutReserveApi.reducer,
  [musafirAclApi.reducerPath]: musafirAclApi.reducer,
  [musafirFlightBookingDetailsApi.reducerPath]:
    musafirFlightBookingDetailsApi.reducer,
  [musafirPaymentApi.reducerPath]: musafirPaymentApi.reducer,
  [musafirHomePageApi.reducerPath]: musafirHomePageApi.reducer,
  [musafirMyTripsApi.reducerPath]: musafirMyTripsApi.reducer,
  [tripReducerApi.reducerPath]: tripReducerApi.reducer,
  [tagReducerApi.reducerPath]: tagReducerApi.reducer,
  [flightAutoSearchgqlReducerApi.reducerPath]:
    flightAutoSearchgqlReducerApi.reducer,
  [approversSearchAutoCompletegqlReducerApi.reducerPath]:
    approversSearchAutoCompletegqlReducerApi.reducer,
  [musafirTravelPolicyApi.reducerPath]: musafirTravelPolicyApi.reducer,
  [musafirApprovalApi.reducerPath]: musafirApprovalApi.reducer,
  [musafirPricingPolicyApi.reducerPath]: musafirPricingPolicyApi.reducer,
  [policyConstraintSearchReducerApi.reducerPath]:
    policyConstraintSearchReducerApi.reducer,
  // [approvalAutoSearchgqlReducerApi.reducerPath]: approvalAutoSearchgqlReducerApi.reducer,
  [musafirAncillariesBaggageApi.reducerPath]:
    musafirAncillariesBaggageApi.reducer,
  [musafirFlightAncillariesSeatsApi.reducerPath]:
    musafirFlightAncillariesSeatsApi.reducer,
  [musafirFlightAncillariesMealsApi.reducerPath]:
    musafirFlightAncillariesMealsApi.reducer,
  [musafirGroupTest.reducerPath]: musafirGroupTest.reducer,
  [musafirOfferApi.reducerPath]: musafirOfferApi.reducer,
   [musafirVoucherApi.reducerPath]: musafirVoucherApi.reducer,
   [musafirBudgetsApi.reducerPath]: musafirBudgetsApi.reducer,
   [musafirTagsApi.reducerPath]: musafirTagsApi.reducer,
   [musafirOrganizationApi.reducerPath]: musafirOrganizationApi.reducer,
[musafirGoogleLocationApi.reducerPath]: musafirGoogleLocationApi.reducer,
  menu: menuReducer,

  loginSlice: loginSlice.reducer,
  marketSlice: marketSlice.reducer,
  rolesSlice: rolesSlice.reducer,
  userSlice: userSlice.reducer,
  aclSlice: aclSlice.reducer,
  lookupSlice: lookupSlice.reducer,
  orgSlice: orgSlice.reducer,
  notificationSlice: notificationSlice.reducer,
  flightLookupSlice: flightLookupSlice.reducer,
  flightSearchSlice: flightSearchSlice.reducer,
  flightListSlice: flightListSlice.reducer,
  flightCheckoutReserveSlice: flightCheckoutReserveSlice.reducer,
  flightSelectSlice: flightSelectSlice.reducer,
  myTripsSlice: myTripsSlice.reducer,
  approvalWorkFlowSlice: approvalWorkFlowSlice.reducer,
  pricingPolicySlice: pricingPolicySlice.reducer,
  flightAncillariesBaggageApiSlice: FlightAncillariesBaggageApiSlice.reducer,
  FlightAncillariesSeatsApiSlice: FlightAncillariesSeatsApiSlice.reducer,
  FlightAncillariesMealsApiSlice: FlightAncillariesMealsApiSlice.reducer,

  ancillariesSelectionsSlice: ancillariesSelectionsSlice.reducer,
  tagsSlice: tagsSlice.reducer,
  quotationSlice: quotationSlice.reducer,
  tagCreationDataSlice: tagCreationDataSlice.reducer,
  selectValueSlice: selectValueSlice.reducer,
  budgetSlice: budgetSlice.reducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "loginSlice",
    "marketSlice",
    "rolesSlice",
    "userSlice",
    "aclSlice",
    "lookupSlice",
    "orgSlice",
    "notificationSlice",
    "airportSlice",
    "flightLookupSlice",
    "flightListSlice",
    "flightSearchSlice",
    "flightCheckoutReserveSlice",
    "flightSelectSlice",
    "flightBookingDetailsSlice",
    "myTripsSlice",
    "approvalWorkFlowSlice",
    "pricingPolicySlice",
    "flightAncillariesBaggageApiSlice",
    "ancillariesSelectionsSlice",
    "FlightAncillariesSeatsApiSlice",
    "FlightAncillariesMealsApiSlice",
    "tagsSlice",
    "tagCreationDataSlice",
    "quotationSlice",
    "selectValueSlice",
    "budgetSlice",
    "menu"
  ],
};

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STATE") {
    state = {};
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      musafirApi.middleware,
      musafirMarketApi.middleware,
      musafirRolesApi.middleware,
      musafirUserApi.middleware,
      musafirLoginApi.middleware,
      musafirLookupApi.middleware,
      musafirOrgApi.middleware,
      musafirNotificationApi.middleware,
      musafirFlightLookupApi.middleware,
      musafirFlightListApi.middleware,
      musafirFlightSelectApi.middleware,
      musafirFlightCheckoutReserveApi.middleware,
      musafirAclApi.middleware,
      musafirPaymentApi.middleware,
      musafirFlightBookingDetailsApi.middleware,
      musafirHomePageApi.middleware,
      musafirMyTripsApi.middleware,
      tripReducerApi.middleware,
      tagReducerApi.middleware,
      flightAutoSearchgqlReducerApi.middleware,
      approversSearchAutoCompletegqlReducerApi.middleware,
      musafirTravelPolicyApi.middleware,
      musafirApprovalApi.middleware,
      policyConstraintSearchReducerApi.middleware,
      musafirAncillariesBaggageApi.middleware,
      musafirFlightAncillariesMealsApi.middleware,
      musafirFlightAncillariesSeatsApi.middleware,
      musafirGroupTest.middleware,
      musafirOfferApi.middleware,
      musafirVoucherApi.middleware,
      musafirBudgetsApi.middleware,
      musafirTagsApi.middleware ,
      musafirOrganizationApi.middleware,
      musafirPricingPolicyApi.middleware,
      musafirGoogleLocationApi.middleware
    ),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
