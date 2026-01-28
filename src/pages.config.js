import AdminExport from './pages/AdminExport';
import Contacto from './pages/Contacto';
import Dashboard from './pages/Dashboard';
import Gracias from './pages/Gracias';
import Home from './pages/Home';
import AdminChat from './pages/AdminChat';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminExport": AdminExport,
    "Contacto": Contacto,
    "Dashboard": Dashboard,
    "Gracias": Gracias,
    "Home": Home,
    "AdminChat": AdminChat,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};