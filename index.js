'use strict';

const api_key = "diLRSBmYMhumJk0BLXyeOR64vwdmGnvPPgwtjCzh";
const base_url= "https://developer.nps.gov/api/v1/parks";

function displayResults(responseJson,limit){
    console.log(responseJson);
    console.log(responseJson.data[0].fullName,limit);
  
    $("#js-results-list").empty();
    for(let i= 0; i < limit; i++){
    $("#js-results-list").append(`<li><h3>${responseJson.data[i].fullName}HI<h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>`);
    }
    console.log('results were appended');
    $('#js-results').removeClass("hidden");
}

function getParams(params){
 const queryString = Object.keys(params).
 map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
 return queryString.join('&');
}


function getResults(state,max=10){
    const params = {
        stateCode: state,
        api_key: api_key,
        limit: max
    };

    const queryParams = getParams(params);
    console.log(queryParams);
    const url = base_url + '?' + queryParams;
    
    fetch(url)
    .then(response => {if(response.ok){     
        return response.json();
    }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson,max))
    .catch(err => {$("js-error-message").text(`Something went wrong: ${err.message}`)
    });
}



function watchForm(){
    $("#js-form").submit(function(event){
        event.preventDefault();
        console.log('watchForm ran');
        const parkName= $("#js-search-term").val();
        const maxResults= $("#js-max-results").val();
        console.log(parkName,maxResults);

        const queryResults = getResults(parkName,maxResults);

    })
}

$(watchForm);