'use strict';

const api_key = "diLRSBmYMhumJk0BLXyeOR64vwdmGnvPPgwtjCzh";
const google_api_key= "AIzaSyAIZy1A-yntbrNRZAh31hjzL7Xy5tzZ5z4";
const base_url= "https://developer.nps.gov/api/v1/parks";
const google_base_url = "https://maps.googleapis.com/maps/api/geocode/json";





function googleFetch(url){

    fetch(url)
        .then(response => {if(response.ok){     
            return response.json();
        }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log(responseJson))
        .catch(err => {$("js-error-message").text(`Something went wrong: ${err.message}`)});
    
    }



function displayResults(responseJson,limit){
    console.log(responseJson);
  
    $("#js-results-list").empty();
    for(let i= 0; i < limit; i++){

    /*const coordinates= `${responseJson.data[i].latLong}`;
    const newcoord = coordinates.split();
    let lat = newcoord[i].slice(4,13);
    let long =newcoord[i].slice(27,37)
    console.log(`This is after characters have been sliced ${lat} and ${long}`);
    let latLong=lat + ',' + long;
 
    const googleUrl=`${google_base_url}?latlng=${latLong}&key=${google_api_key}`;
    
    /*const googleResponseJson = googleFetch(googleUrl);*/
    
    $("#js-results-list").append(`<li><h3>${responseJson.data[i].fullName}</h3>
      <p class="description">${responseJson.data[i].description}</p>
      <a class="url" href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>`);
    }
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
    .catch(err => {$("js-error-message").text(`Something went wrong: ${err.message}`)});

            
}




function watchForm(){
    $("#js-form").submit(function(event){
        event.preventDefault();
        console.log('watchForm ran');
        const stateCode= $("#js-search-term").val();
        const maxResults= $("#js-max-results").val();
        console.log(stateCode,maxResults);

        const queryResults = getResults(stateCode,maxResults);

    })
}

$(watchForm);