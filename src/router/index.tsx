import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "../App";


const delay = (ms:any) => new Promise(resolve => setTimeout(resolve, ms));

const lazyWithDelay = (importFunc:any) => {
    return lazy(() => delay(1000).then(importFunc));
};

const SignIn = lazyWithDelay(() => import('../modules/auth/pages/sign-in'));
const SignUp = lazyWithDelay(() => import('../modules/auth/pages/sign-up'));
const AdminLayout = lazyWithDelay(() => import('../modules/layout'));
const Category = lazyWithDelay(() => import('../modules/category/pages'));
const Product = lazyWithDelay(() => import('../modules/product/pages'));
const Brands = lazyWithDelay(() => import('../modules/brand/pages'));
const BrandCategory = lazyWithDelay(() => import('../modules/brandcategory/pages'));
const Ads = lazyWithDelay(() => import('../modules/ads/pages'));
const Stock = lazyWithDelay(() => import('../modules/stock/pages'));
const Settings = lazyWithDelay(() => import('../modules/settings/pages'));
const SubCategory = lazyWithDelay(() => import('../modules/sub-category/pages'));
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
