const endpoint = 'https://coronavirus-tracker-api.herokuapp.com/v2/';
const spainId = 18;
const italyId = 16;
const NO_CONFIRMED_CASES = 0 ;

const spConfirmedNow = document.getElementById('spConfirmedNow');
const spDeathNow = document.getElementById('spDeathNow');
const spRecoveredNow = document.getElementById('spRecoveredNow');
const countryNow = document.getElementById('countryNow');
const tableTimelineConfirmed = document.getElementById('timelineConfirmed');
const tableTimelineDeath = document.getElementById('timelineDeath');
const tableTimelineRecovered = document.getElementById('timelineRecovered');
const timelineTable = document.getElementById('timelineTable');


const getLocationById = async (idLocation) => {
    let response = await fetch(endpoint + 'locations/' + idLocation);
    let data = await response.json()
    return data;
}

const renderingNowData = (data) => {
    spConfirmedNow.innerHTML = data.location.latest.confirmed;
    spDeathNow.innerHTML = data.location.latest.deaths;
    spRecoveredNow.innerHTML = data.location.latest.recovered;
    countryNow.innerHTML = data.location.country
}

const renderingTimeLineData = (data) => {
    const {
        confirmed,
        deaths,
        recovered
    } = data.location.timelines;
    createTimelineTables(data.location.timelines);


}

const createNowTable = () =>{

}

const createTimelineTables = (data) => {

     console.log(data);
    let tableValues =
        `   <tr>
                <td colspan = '4' > Linea de tiempo en ESPAÑA </td>
            </tr>
            <tr>
                <td>FECHA</td>
                <td>Confirmados</td>
                <td>Fallecidos</td>
                <td>Recuperados</td>
            </tr>`;

        Object.keys(data.confirmed.timeline).map((dateValue , value )=>{
            let  dayofValue = new Date(dateValue); 
            if(data.confirmed.timeline[dateValue] > NO_CONFIRMED_CASES ){
                tableValues += 
                `
                <tr>
                    <td>${dayofValue.toLocaleDateString()}</td>
                    <td>${data.confirmed.timeline[dateValue]}</td>
                    <td>${data.deaths.timeline[dateValue]}</td>
                    <td>${data.recovered.timeline[dateValue]}</td>
                </tr>
                `
            }

        })

    timelineTable.innerHTML = tableValues;

}


const formatData = (data) => {
    renderingNowData(data);
    renderingTimeLineData(data);
}

const init = () => {

    getLocationById(spainId).then(
        data => formatData(data))
}

document.addEventListener('load', init());