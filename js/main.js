const endpoint = 'https://coronavirus-tracker-api.herokuapp.com/v2/';
const spainId = 18;
const italyId = 16;
const TABLE_TYPE = {
    confirmed: 'confirmed',
    deaths: 'deaths',
    recovered: 'recovered'
};

const spConfirmedNow = document.getElementById('spConfirmedNow');
const spDeathNow = document.getElementById('spDeathNow');
const spRecoveredNow = document.getElementById('spRecoveredNow');
const countryNow = document.getElementById('countryNow');
const tableTimelineConfirmed = document.getElementById('timelineConfirmed');
const tableTimelineDeath = document.getElementById('timelineDeath');
const tableTimelineRecovered = document.getElementById('timelineRecovered');


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
    renderTimelineTables(TABLE_TYPE.confirmed, confirmed);
    renderTimelineTables(TABLE_TYPE.deaths, deaths);
    renderTimelineTables(TABLE_TYPE.recovered, recovered);

}

const renderTimelineTables = (type, data) => {
    let tableValues =
        `   <tr>
                <td colspan = '2' > ${type} </td>
            </tr>
            <tr>
                <td>FECHA</td>
                <td>CASOS</td>
            </tr>`;

    Object.keys(data.timeline).forEach((key) => {
        if(data.timeline[key] > 0 ){
            let date = new Date(key);
            tableValues += `
            <tr><td>${date.toDateString()}</td> <td>${data.timeline[key]}</td></tr>
            `
        }
    });

    switch (type) {
        case 'confirmed':
            tableTimelineConfirmed.innerHTML = tableValues;
            break;
        case 'deaths':
            tableTimelineDeath.innerHTML = tableValues;
            break;
        case 'recovered':
            tableTimelineRecovered.innerHTML = tableValues;
            break;
    }
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