
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { Layout } from "../pages/Layout";
import { Home } from "../pages/Home";
import { ContactForm } from "../pages/ContactForm";
import { Agenda } from "../pages/Agenda";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path="/contactform" element={<ContactForm/>}/>
        <Route path="/agenda" element={<Agenda/>}/>
      </Route>
    )
);