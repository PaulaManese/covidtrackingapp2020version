import { Doughnut } from "react-chartjs-2"

export default function DoughnutChart({cases, criticals, deaths, recoveries}){
    return(
        <Doughnut data={{
            datasets: [{
                data: [cases, criticals, deaths, recoveries],
                backgroundColor: ["black", "yellow", "red", "blue"]
            }],
            labels: ["Cases", "Criticals", "Deaths", "Recoveries"]
        }} redraw={false}/>
    )
}