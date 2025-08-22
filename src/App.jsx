import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider";
import Spinner from "./components/Spinner/Spinner";
import { ArtistsProvider } from './context/ArtistsProvider';

const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const ProtectedRoute = lazy(() => import("./layouts/ProtectedRoute"));
const Login = lazy(() => import("./pages/Login"));
const RegisterUser = lazy(() => import("./pages/RegisterUser"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NewPassword = lazy(() => import("./pages/NewPassword"));
const ConfirmAccount = lazy(() => import("./pages/ConfirmAccount"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const ServicePackages = lazy(() => import("./pages/ServicePackages"));
const PackageDetails = lazy(() => import("./pages/PackageDetails"));
const Home = lazy(() => import("./pages/Home"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const MakePayment = lazy(() => import("./pages/MakePayment"));
const ConfirmReservation = lazy(() => import("./pages/ConfirmReservation"));
const MainHub = lazy(() => import("./pages/MainHub"));
const Cotizacion = lazy(() => import("./pages/Cotizacion"));
const EventsAll = lazy(() => import("./pages/EventsAll"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const ReservationMaps = lazy(() => import("./pages/ReservationMaps"));
const ConfigResources = lazy(() => import("./pages/ConfigResources"));
const ConfigPackage = lazy(() => import("./pages/ConfigPackage"));


function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />} >

        <AuthProvider>


          <Routes>
            {/* rutas de area publica */}
            <Route path="/" element={<Home />}> 
              {/* <Route path="about" element={<About />} />
              <Route path="package" element={<ServicePackages />} />
              <Route path="package/:id" element={<PackageDetails />} />
              <Route path="reservationMaps" element={<ReservationMaps />} />
              <Route path="terms-conditions" element={<TermsAndConditions />} />
              <Route path="make-payment-reservation" element={<MakePayment />} />
              <Route path="login" element={<Login />} />
              <Route path="registrar" element={<RegisterUser />} />
              <Route path="olvide-password" element={<ForgotPassword />} />
              <Route path="olvide-password/:token" element={<NewPassword />} />
              <Route path="confirm-account/:id" element={<ConfirmAccount />} /> */}
            </Route>

            {/* rutas protegidas */}
            <Route path="/events" element={<ArtistsProvider> <ProtectedRoute />   </ArtistsProvider>}>
              <Route index element={<MainHub />} />
              <Route path="config-resources" element={<ConfigResources />} />
              <Route path="config-resources/package" element={<ConfigPackage />} />
              <Route path="manage-events" element={<EventsAll />} />
              <Route path="manage-events/event-detail" element={<EventDetail />} />
              <Route path="confirmar-reservacion/:id" element={<ConfirmReservation />} />
              <Route path="enviar-cotizacion" element={<Cotizacion />} />
              <Route path="enviar-cotizacion/:id" element={<Cotizacion />} />


            </Route>

            <Route path="/*" element={<NotFound />} />


          </Routes>
          {/* </ProyectosProvider> */}
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
