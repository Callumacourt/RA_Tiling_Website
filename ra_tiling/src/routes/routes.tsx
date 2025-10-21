import {GalleryPage, HomePage, AboutPage, ContactPage} from "../pages/index.tsx"
import Header from "../components/header/Header.tsx";
import { Outlet } from "react-router";
import { ErrorEle } from "../ErrorEle.tsx";

export const routes = [
    {
        path: '/',
        element: (
        <>
        <Header/>
        <Outlet/>
        </>
        ),
        children: [
        {path: '', element: <HomePage/>, errorElement: <ErrorEle/>},
        {path: 'gallery', element: <GalleryPage/>, errorElement: <ErrorEle/>},
        {path: 'about', element: <AboutPage/>, errorElement: <ErrorEle/>},
        {path: 'contact',   element: <ContactPage/>, ErrorElement: <ErrorEle/>},
        ],
        errorElement: <ErrorEle/>
    },
  
] 