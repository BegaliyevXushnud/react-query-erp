import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "../App";

const SignIn = lazy(() => import('../modules/auth/pages/sign-in'));
const SignUp = lazy(() => import('../modules/auth/pages/sign-up'));
const AdminLayout = lazy(() => import('../modules/layout'));
const Category = lazy(() => import('../modules/category/pages'));
const Product = lazy(() => import('../modules/product/pages'));
const Brands = lazy(() => import('../modules/brand/pages'));
const BrandCategory = lazy(() => import('../modules/brandcategory/pages'));
const Ads = lazy(() => import('../modules/ads/pages'));
const Stock = lazy(() => import('../modules/stock/pages'));
const Settings = lazy(() => import('../modules/settings/pages'));
const SubCategory = lazy(() => import('../modules/sub-category/pages'));
import { Loading, NotFound } from "@component";

const Index: React.FC = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App />}>
                <Route index element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="admin-layout" element={<AdminLayout />}>
                    <Route index element={<Product />} />
                    <Route path="category" element={<Category />} />
                    <Route path="category/sub-category/:id" element={<SubCategory />} />
                    <Route path="brands" element={<Brands />} />
                    <Route path="brands-category" element={<BrandCategory />} />
                    <Route path="ads" element={<Ads />} />
                    <Route path="stock" element={<Stock />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return (
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default Index;
