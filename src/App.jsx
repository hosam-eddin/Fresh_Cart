import Layout from "./Component/Layout/Layout";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./Component/Home/Home";
import Notfound from "./Component/NotFound/Notfound";
import Cart from "./Component/Cart/Cart";
import Brands from "./Component/Brands/Brands";
import Categories from "./Component/Categories/Categories";
import Products from "./Component/Products/Products";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import Logout from "./Component/Logout/Logout";
import CounterContextProvider from "./Component/CounterContext/CounterContext";
import UserContextProvider from "./Component/CounterContext/UserContext";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import CartContextProvider from "./Component/CounterContext/CartContext";
import Profile from "./Component/Profile/Profile";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import BrandsDetails from "./Component/Brands/BrandsDetails";
import Address from "./Component/address/Address";
import Orders from "./Component/Allorders/allorders";
import ForgetPass from "./Component/ForgetPass/ForgetPass";
import Reset from './Component/reset/Reset';
import Code from './Component/code/Code';
import CategoriesDetails from "./Component/CategoriesDetails/CategoriesDetails";
import WhishList from "./Component/whishList/whishList";


export default function App() {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "logout", element: <Logout /> },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/whishList",
          element: (
            <ProtectedRoute>
              <WhishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/forget",
          element: <ForgetPass />,
        },
        {
          path: "/reset",
          element: <Reset />,
        },
        {
          path: "/code",
          element: <Code />,
        },

        {
          path: "/address",
          element: (
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductsDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "BrandDetails/:id",
          element: (
            <ProtectedRoute>
              <BrandsDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "CategoriesDetails/:id",
          element: (
            <ProtectedRoute>
              <CategoriesDetails />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <CartContextProvider>
      <UserContextProvider>
        <Provider store={store}>
          <CounterContextProvider>
            <RouterProvider router={routers}></RouterProvider>
          </CounterContextProvider>
        </Provider>
      </UserContextProvider>
      <Toaster />
    </CartContextProvider>
  );
}
