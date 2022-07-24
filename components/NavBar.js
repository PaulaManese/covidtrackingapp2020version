import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

export default function NavBar(){
	return (
		<Navbar bg="light" expand="lg">
		  <Link href="/">
	      	<a className="navbar-brand">Covid-19 Tracker</a>
	      </Link>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto navbar-nav">
					<Link href="/covid/countries">
						<a className="nav-link" role="button">Infected countries</a>
					</Link>
					<Link href="/covid/search">
						<a className="nav-link" role="button">Find a country</a>
					</Link>
					<Link href="/covid/top">
						<a className="nav-link" role="button">Top countries</a>
					</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}