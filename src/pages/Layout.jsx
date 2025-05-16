import { Outlet } from "react-router-dom/dist"
import { useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Layout = () => {
    const { actions } = useGlobalReducer();

    useEffect(() => {
    actions.getContacts(); 
  }, []);;

    return (
        <ScrollToTop>
            <Outlet />
        </ScrollToTop>
    );
};
