import toNum from "../toNum"
import {Jumbotron} from "react-bootstrap"


export default function Home({globalTotal}) {
  return (
    <Jumbotron className="landing-page">
      <h1 className="font-smaller">Total Covid-19 Cases in the World: <br/><strong><b>{globalTotal.cases}</b></strong></h1>
    </Jumbotron>
  )
}

export async function getStaticProps(){
  const res = await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "845fffac15msh4e2ce739ee27ae3p175c72jsnfc0f72331198"
    }
  })

  const data = await res.json()
  const countriesStats = data.countries_stat

  let total = 0
  countriesStats.forEach(country => {
    total += toNum(country.cases)
  })

  const globalTotal = {
    cases: total
  }

  return {
    props: {
      globalTotal
    }
  }
}

