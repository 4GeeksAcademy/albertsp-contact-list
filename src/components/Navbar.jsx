import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-dark" style={{ backgroundColor: '#16213e', borderBottom: '1px solid #0f3460' }}>
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1" style={{ color: '#ffffff' }}>Contact List</span>
				</Link>
				<div className="buttons-container-navbar">
					<Link to="/agenda">
					<button className="btn" style={{ backgroundColor: '#4a90d9', color: 'white', border: 'none' }}>Generate Agenda</button>
					</Link>
					<Link to="/contactform">
						<button className="btn" style={{ backgroundColor: '#4a90d9', color: 'white', border: 'none' }}>Add new contact</button>
					</Link>

				</div>
			</div>
		</nav>
	);
};