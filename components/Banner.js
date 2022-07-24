import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

export default function Banner({ country, cases, criticals, deaths, recoveries }) {
   return (
       <Jumbotron>
           <h1>{country}</h1>
           <p>Cases: {cases}</p>
           <p>Deaths: {deaths}</p>
           <p>Recoveries: {recoveries}</p>
           <p>Critical cases: {criticals}</p>
           <Button variant="primary" href="/covid/countries">View Countries</Button>
       </Jumbotron>
   )
}