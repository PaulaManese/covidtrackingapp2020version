import { useState, useRef, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import mapboxgl from "mapbox-gl"
mapboxgl.accessToken = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_KEY
import toNum from "../../toNum";
import DoughnutChart from "../../components/DoughnutChart"

export default function Home({data}){
  const countriesStats = data.countries_stat
	const [targetCountry, setTargetCountry] = useState('')
	const [name, setName] = useState('')
	const [cases, setCases] = useState(0)
	const [criticals, setCriticals] = useState(0)
	const [deaths, setDeaths] = useState(0)
  const [recoveries, setRecoveries] = useState(0)

  const mapContainerRef = useRef(null)

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [longitude, latitude],
      zoom: 3
    })
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right")
    
    const marker = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map)

    return () => map.remove()
  }, [latitude, longitude])

    function search(e){
        e.preventDefault()
        const match = countriesStats.find(country => country.country_name.toLowerCase() === targetCountry.toLowerCase())
        if(match){
          setName(match.country_name)
          setCases(toNum(match.cases))
          setCriticals(toNum(match.serious_critical))
          setDeaths(toNum(match.deaths))
          setRecoveries(toNum(match.total_recovered))

          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${targetCountry}.json?access_token=${process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_KEY}`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setLongitude(data.features[0].center[0])
            setLatitude(data.features[0].center[1])
          })
        }
        
    }

    return (
        <React.Fragment>
          <Container>
            <Form onSubmit={e => search(e)} className="my-5">
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Search for a country" value={targetCountry} onChange={e => setTargetCountry(e.target.value)}/>
                    <Form.Text className="text-muted">
                        Get Covid-19 stats of searched for country
                    </Form.Text>
                </Form.Group>
                <Button variant="outline-dark" type="submit">Submit</Button>
            </Form>
            
            <h1 className="search-name">Country: {name}</h1>
            <Row>
              <Col xs={12} md={12}>
                <DoughnutChart cases={cases} criticals={criticals} deaths={deaths} recoveries={recoveries}/>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <div className="mapContainer" ref={mapContainerRef}/>
              </Col>
            </Row>
            </Container>
        </React.Fragment>
    )
}

export async function getStaticProps(){
    const res = await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          "x-rapidapi-key": "411c99882fmsh8bdfeafa40035fep1ec6adjsn6af979742e35"
      }
    })
  
    const data = await res.json()
  
    return {
      props: {
        data
      }
    }
  }

  