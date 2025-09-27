import {GalleryPage, HomePage, AboutPage, ContactPage} from "../pages"
import { ErrorEle } from "../ErrorEle.tsx";

export const routes = [
    {
        path: '/',
        element: <HomePage/>,
        errorElement: <ErrorEle/>
    },
    {
        path: 'gallery',
        element: <GalleryPage/>,
        errorElement: <ErrorEle/>
    },
    {
        path: 'about',
        element: <AboutPage/>,
        errorElement: <ErrorEle/>
    },
    {
        path: 'contact',
        element: <ContactPage/>,
        ErrorElement: <ErrorEle/>
    }
] 