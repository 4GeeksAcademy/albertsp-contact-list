import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  	const {store, dispatch} =useGlobalReducer();

	return (
		<div className="text-center mt-5">
			<h1>Welcome to Agenda Management</h1>
			<p>Click to Generate Agenda in the Navbar</p>
		</div>
	);
}; 