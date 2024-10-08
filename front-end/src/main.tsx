import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  RoomDetails,
  Rooms,
  BookingPage,
  ProfilePage,
  EditRoomPage,
  ProfileLayout,
  ManageBookingPage,
  CurrentUserPage,
  Notification,
  YourBookingPage,
} from "./pages";
import { LandingPageContent } from "./hooks";
import { NavBar, RoomAdd } from "./components";
import { store } from "./state-management/store/store";
import { Provider } from "react-redux";
import "./index.css";
import { AuthenticatedRoutes } from "./pages/protected-pages/Authenticated";
import { OwnerPage } from "./pages/protected-pages/Owner";
import { SocketContext } from "./hooks/context/SocketContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <LandingPageContent>
        <SocketContext>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NavBar />}>
                <Route index element={<Home />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/room-details/:id" element={<RoomDetails />} />
                <Route path="" element={<OwnerPage />}>
                  <Route path="/add-room" element={<RoomAdd />} />
                  <Route path="/edit-room/:id" element={<EditRoomPage />} />
                  <Route
                    path="/booking-details/:id"
                    element={<BookingPage />}
                  />
                </Route>
                <Route path="" element={<AuthenticatedRoutes />}>
                  <Route path="/notification" element={<Notification />} />
                  <Route path="/profile" element={<ProfileLayout />}>
                    <Route index element={<ProfilePage />} />
                    <Route
                      path="manage-bookings"
                      element={<ManageBookingPage />}
                    />
                    <Route path="current-users" element={<CurrentUserPage />} />
                    <Route path="your-booking" element={<YourBookingPage />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </SocketContext>
      </LandingPageContent>
    </Provider>
  </StrictMode>
);
