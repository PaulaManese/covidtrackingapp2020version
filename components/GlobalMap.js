import { useState, useRef, useEffect } from "react";
import { Col } from "react-bootstrap";
import mapboxgl from "mapbox-gl"
mapboxgl.accessToken = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_KEY

export default function GlobalMap({country}){
  // console.log(country)
  const mapContainerRef = useRef(null)

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  
  useEffect(() => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=${process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_KEY}`)
          .then(res => res.json())
          .then(data => {
            setLongitude(data.features[0].center[0])
            setLatitude(data.features[0].center[1])
          })
        
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

  return ( 
    <Col xs={12} md={12}>
      <div className="mapContainer" ref={mapContainerRef}/>
    </Col>
  )
}