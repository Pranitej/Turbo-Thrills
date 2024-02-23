import { BrowserRouter } from "react-router-dom";
import { createContext } from "react";
import { useState } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import PageNotFound from "./components/pages/PageNotFound";
import CustomerLogin from "./components/pages/CustomerLogin";
import Signup from "./components/pages/SignupPage";
import About from "./components/pages/AboutPage";
import Contact from "./components/pages/Contact";
import AdminHome from "./components/pages/AdminHome";
import CustomerHome from "./components/pages/CustomerHome";
import AdminLogin from "./components/pages/AdminLogin";
import SellCar from "./components/pages/SellCar";
import ViewCustomers from "./components/pages/ViewCustomers";
import CustomerProfile from "./components/pages/CustomerProfile";
import EditProfile from "./components/pages/EditProfile";
import CustomerMain from "./components/pages/CustomerMain";
import Cart from "./components/pages/Cart";
import CustomerSelledCarsPage from "./components/pages/CustomerSelledCarsPage";
import PurchasedCars from "./components/pages/PurchasedCars";
import PaymentShipment from "./components/PaymentShipment";
import AdminViewCarSales from "./components/pages/AdminViewCarSales";
import CustomerRareCarPage from "./components/pages/CustomerRareCarPage";
import Reviews from "./components/pages/Reviews";
import CarBuyer from "./components/pages/CarBuyer";
import CarSellers from "./components/pages/CarSellers";
import ViewContactUs from "./components/pages/ViewContactUs";

const data = createContext();

export default function App() {
  let [adminLoginStatus, setAdminLoginStatus] = useState(false);
  let [customerLoginStatus, setCustomerLoginStatus] = useState(false);
  let [customerId, setCustomerId] = useState(0);

  return (
    <div>
      <data.Provider
        value={{
          adminLoginStatus: adminLoginStatus,
          setAdminLoginStatus: setAdminLoginStatus,
          customerLoginStatus: customerLoginStatus,
          setCustomerLoginStatus: setCustomerLoginStatus,
          customerId: customerId,
          setCustomerId: setCustomerId,
        }}
      >
        <BrowserRouter>
          <main>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/aboutus" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/contactus" element={<Contact />} />
              <Route path="/customerlogin" element={<CustomerLogin />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="/signup" element={<Signup />} />

              {adminLoginStatus ? (
                <>
                  <Route path="/admin" element={<AdminHome />} />
                  <Route path="/adminpage" element={<AdminHome />} />
                  <Route path="/admin/home" element={<AdminHome />} />
                  <Route
                    path="/admin/viewcustomer"
                    element={<ViewCustomers />}
                  />
                  <Route
                    path="/admin/viewcustomers"
                    element={<ViewCustomers />}
                  />
                  <Route
                    path="/admin/viewcarsales"
                    element={<AdminViewCarSales />}
                  />
                  <Route
                    path="/admin/viewcontactus"
                    element={<ViewContactUs />}
                  />
                </>
              ) : (
                <></>
              )}

              {customerLoginStatus ? (
                <>
                  <Route path="/customer" element={<CustomerHome />} />
                  <Route path="/customerpage" element={<CustomerHome />} />
                  <Route path="/customer/home" element={<CustomerHome />} />
                  <Route path="/customer/sellcar" element={<SellCar />} />
                  <Route path="/customermain" element={<CustomerMain />} />
                  <Route
                    path="/customer/profile"
                    element={<CustomerProfile />}
                  />
                  <Route
                    path="/customer/customerrarecar"
                    element={<CustomerRareCarPage />}
                  />
                  <Route
                    path="/customer/editprofile"
                    element={<EditProfile />}
                  />
                  <Route
                    path="/customer/selledcars"
                    element={<CustomerSelledCarsPage />}
                  />
                  <Route path="/customer/cart" element={<Cart />} />
                  <Route
                    path="/customer/purchasedcars"
                    element={<PurchasedCars />}
                  />
                  <Route
                    path="/customer/paymentshipment"
                    element={<PaymentShipment />}
                  />
                  <Route path="/customer/reviews" element={<Reviews />} />
                  <Route
                    path="/customer/carbuyerquestions"
                    element={<CarBuyer />}
                  />
                  <Route
                    path="/customer/carsellerquestions"
                    element={<CarSellers />}
                  />
                </>
              ) : (
                <></>
              )}

              {/* Else */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </data.Provider>
    </div>
  );
}

export { data };
