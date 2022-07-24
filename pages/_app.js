import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mapbox-gl/dist/mapbox-gl.css'
import "../styles/styles.css"
// import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
  	<React.Fragment>
	  	<NavBar />
	  		<Component {...pageProps} />
		<Footer />
  	</React.Fragment>
  )
}

export default MyApp