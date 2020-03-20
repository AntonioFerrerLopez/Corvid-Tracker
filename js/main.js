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
const canvasTimeline = document.getElementById('canvasTimeline');


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

const generateDateTimelineArray =(data)=>{
    let dataValues = []; 
    Object.keys(data.location.timelines.confirmed.timeline).forEach((value)=>{
        let dateValue = new Date(value); 
        dataValues.push(dateValue.toLocaleDateString());
    })
    return dataValues;
}

const generateValuesTimelineArray = (data , type)=>{
    let dataValues = []; 
        if (type === 'confirmed'){
            Object.keys(data.location.timelines.confirmed.timeline).map((key)=>{
                dataValues.push(data.location.timelines.confirmed.timeline[key]);
            })
        }
        if(type === 'death'){
            Object.keys(data.location.timelines.deaths.timeline).map((key)=>{
                dataValues.push(data.location.timelines.deaths.timeline[key]);
            })
        }
        if(type === 'recovered'){
            Object.keys(data.location.timelines.recovered.timeline).map((key)=>{
                dataValues.push(data.location.timelines.recovered.timeline[key]);
            })
        }
    return dataValues;
}

const renderingCanvas = (data) =>{

    let confirmedNow = {
        label : 'Confirmados',
        data : generateValuesTimelineArray(data , 'confirmed') , 
        lineTension: 0.3 ,
        backgroundColor:'rgba(94, 25, 163, 0.4)'
    }
    let deathNow = {
        label : 'Fallecidos',
        data : generateValuesTimelineArray(data , 'death') , 
        lineTension: 0.3 ,
        backgroundColor:'rgba(252, 2, 2, 0.5)'
    }
    let recovered = {
        label : 'Recuperados',
        data : generateValuesTimelineArray(data , 'recovered') , 
        lineTension: 0.3 ,
        backgroundColor:'rgba(124, 249, 0, 0.4)'
    }

    let days = {
        labels : generateDateTimelineArray(data) , 
        datasets: [confirmedNow ,deathNow ,recovered ]
    }

    let nowChart = new Chart(canvasTimeline, {
        type : 'line',
        data : days
    })

}


const formatData = (data) => {
    renderingNowData(data);
    renderingTimeLineData(data);
    renderingCanvas(data);
}

const init = () => {

    getLocationById(spainId).then(
        data => formatData(data))
}

document.addEventListener('load', init());