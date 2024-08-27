import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, RoomDetails, Rooms, BookingPage, ProfilePage } from "./pages";
import { LandingPageContent } from "./hooks";
import { NavBar, RoomAdd } from "./components";
import { store } from "./state-management/store/store";
import { Provider } from "react-redux";
import "./index.css";
import { AuthenticatedRoutes } from "./pages/protected-pages/Authenticated";
import { OwnerPage } from "./pages/protected-pages/Owner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <LandingPageContent>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/room-details/:id" element={<RoomDetails />} />
              <Route path="" element={<OwnerPage />}>
                <Route path="/add-room" element={<RoomAdd />} />
                <Route path="/booking-details/:id" element={<BookingPage />} />
              </Route>
              <Route path="" element={<AuthenticatedRoutes />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LandingPageContent>
    </Provider>
  </StrictMode>
);
