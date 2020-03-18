const endpoint = 'https://coronavirus-tracker-api.herokuapp.com/v2/';
const spainId = 18 ;  
const italyId = 16; 

const spConfirmedNow = document.getElementById('spConfirmedNow');
const spDeathNow = document.getElementById('spDeathNow');
const spRecoveredNow = document.getElementById('spRecoveredNow');
const countryNow = document.getElementById('countryNow');
const tableTimelineConfirmed = document.getElementById('timelineConfirmed');
const tableTimelineDeath = document.getElementById('timelineDeath');
const tableTimelineRecovered = document.getElementById('timelineRecovered');

const  getLocacations = async () =>{
    let response = await fetch(endpoint+'locations'); 
    let dataValues = await response.json(); 
    return dataValues; 

}

const getLocationById = async (idLocation)=>{

    let response = await fetch(endpoint + 'locations/'+idLocation);

    let data = await response.json()
    return data; 
}

const renderingNowData = (data)=>{
    spConfirmedNow.innerHTML = data.location.latest.confirmed;
    spDeathNow.innerHTML = data.location.latest.deaths;
    spRecoveredNow.innerHTML  = data.location.latest.recovered; 
    countryNow.innerHTML = data.location.country
}

const renderingTimeLineData =(data)=>{
    const {confirmed , deaths, recovered } = data.location.timelines;
    renderConfirmedTable(confirmed); 
    renderDeathTable(deaths);
    renderRecoveredTable(recovered);

}

const renderConfirmedTable = (confirmed)=>{
    let tableConfirmedValues = `  
    <tr>
        <td colspan = '2' > CONFIRMADOS </td>
    </tr>
    <tr>
        <td>FECHA</td>
        <td>CASOS</td>
    </tr>`; 

Object.keys(confirmed.timeline).forEach((key , value)=>{
let date = new Date(key);
tableConfirmedValues += `
<tr><td>${date.toDateString()}</td> <td>${confirmed.timeline[key]}</td></tr>
`
}); 

tableTimelineConfirmed.innerHTML = tableConfirmedValues;
}

renderDeathTable= (deaths)=>{
   
    let tableValues = `  
    <tr>
        <td colspan = '2' >FALLECIDOS </td>
    </tr>
    <tr>
        <td>FECHA</td>
        <td>NUMERO</td>
    </tr>`; 

Object.keys(deaths.timeline).forEach((key , value)=>{
let date = new Date(key);
tableValues += `
<tr><td>${date.toDateString()}</td> <td>${deaths.timeline[key]}</td></tr>
`
}); 

tableTimelineDeath.innerHTML = tableValues;
}

const renderRecoveredTable = (recovered)=>{
    let tableValues = `  
    <tr>
        <td colspan = '2' > RECUPERADOS </td>
    </tr>
    <tr>
        <td>FECHA</td>
        <td>NUMERO</td>
    </tr>`; 

Object.keys(recovered.timeline).forEach((key , value)=>{
let date = new Date(key);
tableValues += `
<tr><td>${date.toDateString()}</td> <td>${recovered.timeline[key]}</td></tr>
`
}); 

tableTimelineRecovered.innerHTML = tableValues;
}

const formatData = (data)=>{
    renderingNowData(data); 
    renderingTimeLineData(data); 
}


const init = ()=>{
 
   getLocationById(spainId).then( 
        data => formatData(data))
}

document.addEventListener('load' , init()); 
   

