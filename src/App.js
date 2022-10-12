import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
  Link,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Notifikasi from "./Pages/Notifikasi/Notifikasi";
import Penawaran from "./Components/Penawaran/Penawaran";
import DaftarJual from "./Components/DaftarJual/DaftarJual";
import Semua from "./Components/DaftarJual/Semua";
import Diminati from "./Components/DaftarJual/Diminati";
import Terjual from "./Components/DaftarJual/Terjual";
import Wishlist from "./Components/DaftarJual/Wishlist";
import Login from "./Pages/LogReg/Login";
import Register from "./Pages/LogReg/Register";
import InfoProfile from "./Pages/Profile/InfoProfile";
import InfoProduk from "./Pages/Product/InfoProduk";
import InfoProdukBuyer from "./Pages/Product/InfoProdukBuyer";
import Logout from "./Components/LoginRegister/Logout";
import Protected from "./Components/HOC/Protected";
import Unprotected from "./Components/HOC/Unprotected";
import AddProduct from "./Components/AddProduct/AddProduct";
import { useDispatch } from "react-redux";
import userSlice from "./store/user";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  try {
    const user = {
      publicId: localStorage.getItem("sessionId"),
      name: localStorage.getItem("sessionName"),
      city: localStorage.getItem("sessionCity"),
      address: localStorage.getItem("sessionImage"),
      handphone: localStorage.getItem("sessionAddress"),
      imageUrl: localStorage.getItem("sessionPhone"),
    };

    if (localStorage.getItem("jwtToken")) {
      dispatch(userSlice.actions.addUser({ userData: user }));
    }
  } catch {}

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/infopb/:id" element={<InfoProdukBuyer />} />
        <Route path="/" element={<Unprotected />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<Unprotected />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/logout" element={<Logout />} />

        {/* Protected */}
        <Route path="/" element={<Protected />}>
          <Route path="/profile" element={<DaftarJual />}>
            <Route path="semua" element={<Semua />} />
            <Route path="diminati" element={<Diminati />} />
            <Route path="terjual" element={<Terjual />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Route>
        <Route path="/" element={<Protected />}>
          <Route path="/notification" element={<Notifikasi />} />
        </Route>
        <Route path="/" element={<Protected />}>
          <Route path="/penawaran/:id" element={<Penawaran />} />
        </Route>
        <Route path="/" element={<Protected />}>
          <Route path="/info" element={<InfoProfile />} />
        </Route>
        <Route path="/" element={<Protected />}>
          <Route path="/infop/:id" element={<InfoProduk />} />
        </Route>
        <Route path="/" element={<Protected />}>
          <Route path="/add" element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
