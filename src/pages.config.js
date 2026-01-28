import AdminExport from './pages/AdminExport';
import Contacto from './pages/Contacto';
import Dashboard from './pages/Dashboard';
import Gracias from './pages/Gracias';
import Home from './pages/Home';


export const PAGES = {
    "AdminExport": AdminExport,
    "Contacto": Contacto,
    "Dashboard": Dashboard,
    "Gracias": Gracias,
    "Home": Home,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};