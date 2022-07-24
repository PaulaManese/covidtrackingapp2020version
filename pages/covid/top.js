import { Doughnut } from "react-chartjs-2"
import toNum from "../../toNum"
import { Container } from "react-bootstrap"

export default function top({data}){
    const countriesStats = data.countries_stat

    function displayChart(e){
        e.preventDefault()
        const match = countriesStats.find(country => country.country_name.toLowerCase() === targetCountry.toLowerCase())
        console.log(match)
        setName(match.country_name)
        setCases(toNum(match.cases))
        setCriticals(toNum(match.serious_critical))
        setDeaths(toNum(match.deaths))
        setRecoveries(toNum(match.total_recovered))
    }

    const countriesCases = countriesStats.map(countryStat => {
        return {
            name: countryStat.country_name, 
            cases: toNum(countryStat.cases)
        }
    })

    countriesCases.sort((a, b) => {
        if(a.cases < b.cases){
            return 1
        }else if(a.cases > b.cases){
            return -1
        }else{
            return 0
        }
    })

    return(
        <React.Fragment>
            <Container>
                <h1 className="text-center top-head-text">10 Countries With The Highest Number of Cases</h1>
                <Doughnut  className="doughnut-chart" data={{
                    datasets: [{
                    data: [countriesCases[0].cases, countriesCases[1].cases, countriesCases[2].cases, countriesCases[3].cases, countriesCases[4].cases, countriesCases[5].cases, countriesCases[6].cases, countriesCases[7].cases, countriesCases[8].cases, countriesCases[9].cases],
                    backgroundColor: ["#ff0000", "#f8c471", "#7fe5f0", "#aeb6bf", "#00ff00", "#ff80ed", "#f08080", "#7d3c98", "#407294", "#065535"]
                    }],
                    labels: [countriesCases[0].name, countriesCases[1].name, countriesCases[2].name, countriesCases[3].name, countriesCases[4].name, countriesCases[5].name, countriesCases[6].name, countriesCases[7].name, countriesCases[8].name, countriesCases[9].name]
                }} redraw={ false } />
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
  