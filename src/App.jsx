import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/login/login.jsx";
import ContactPage from "./pages/contact/index.jsx";
import BookPage from "./pages/book/index.jsx";
import Header from "./Component/Header/index.jsx";
import Footer from "./Component/Footer/index.jsx";
import Home from "./Component/Home/index.jsx";
import Register from "./pages/register/register.jsx";
import NotFound from "./Component/Notfound/index.jsx";
import AdminPage from "./pages/admin/admin.jsx";
import { useEffect, useState } from "react";
import { fetchAccount } from "./service/api.jsx";
import { useDispatch, useSelector } from "react-redux";
import { doGetAction } from "./redux/account/account.slice.jsx";
import Loading from "./Component/Loading/index.jsx";
import ProtectedRoute from "./Component/ProtectedRoute/index.jsx";
import LayoutAdmin from "./Component/LayoutAdmin/LayoutAdmin.jsx";
import UserTable from "./pages/TableUser/TableUser.jsx";
import BookPageDetail from "./pages/bookDetail/index.jsx";
const Layout = () => {
  return (
    <div className="lay-out">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

function App() {
  const isLoading = useSelector((state) => state.account.isLoading);
  const dispatch = useDispatch();

  const callFetchAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      isLoading === false
    )
      return;
    let res = await fetchAccount();

    if (res && res.statusCode === 200) {
      dispatch(doGetAction(res.data.user));
    }
  };

  useEffect(() => {
    callFetchAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement: <NotFound></NotFound>,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book/:slug",
          element: <BookPageDetail />,
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin></LayoutAdmin>,
      errorElement: <NotFound></NotFound>,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
        {
          path: "/admin/user",
          element: <UserTable />,
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage></LoginPage>,
    },

    {
      path: "/register",
      element: <Register></Register>,
    },
  ]);

  return (
    <>
      {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router}></RouterProvider>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
