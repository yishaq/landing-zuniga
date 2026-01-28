import AdminExport from './pages/AdminExport';
import Dashboard from './pages/Dashboard';
import Gracias from './pages/Gracias';
import Home from './pages/Home';
import Contacto from './pages/Contacto';


export const PAGES = {
    "AdminExport": AdminExport,
    "Dashboard": Dashboard,
    "Gracias": Gracias,
    "Home": Home,
    "Contacto": Contacto,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};