import { ListGroup, Container } from "react-bootstrap"
import Link from "next/link";

export default function index({data}){

    const countriesStats = data.countries_stat
    const countriesList = countriesStats.map(country => {
        return (
            <ListGroup.Item key={country.country_name} className="country">
                <Link href={`/covid/countries/${country.country_name.replace(/ /g,"")}`}>
                    <a>
                        {country.country_name}
                    </a>
                </Link>
            </ListGroup.Item>
        )
    })   
    return(
        <Container>
            <ListGroup className="text-center countries-list">
                {countriesList}
            </ListGroup>
        </Container>
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