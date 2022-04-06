
async function getMatchingAds() {
    let resultHTML;
    if(!checkEmptyInputs()) {
        let countryCode = document.getElementById('country').value;
        let languageCode = document.getElementById('language').value;
        let datetime = document.getElementById('datetime').value;
        let url = document.getElementById('url').value;
        let fetchResult;
        try {
            fetchResult = await fetchURL(url);
        } catch (error) {
            console.log(`Was not able to fetch: ${error}`);
        }
        let filteredAds = fetchResult.ads.filter(ad => { return matchesCountry(countryCode, ad.country) &&
                                                                matchesLanguage(languageCode, ad.lang) &&
                                                                isInTimeRange(datetime, ad.start_hour, ad.end_hour) } );
        console.log(filteredAds);
        if (!filteredAds.length == 0)  { // else alert user no result                                                   
            let num = 1;
            resultHTML = "<h3> Here are Available Ads ! </h3>";
            resultHTML += filteredAds.map(ad => { 
                return `
                <div>
                    <p id="ad-count"> AD ${num++}   </p>
                    <p> <strong> ID: </strong> ${ad.id} </p>
                    <p> <strong> Ad Video Url: </strong> <a href="${ad.video_url}"> ${ad.video_url} </a> </p>
                    <iframe width="560" height="315" src="${ad.video_url.replace('watch', 'embed')}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>`

            }).join('\n\n');
        } else {
            resultHTML = "<h3> Sorry, there are no Ads available. </h3>"
        }
    } else {
        resultHTML = "<h3> Please verify you've provided all the necessary information. </h3>"
    }
    document.getElementById("result-section").innerHTML = resultHTML;
}

function checkEmptyInputs() {
    let countryCode = document.getElementById('country').value;
    let languageCode = document.getElementById('language').value;
    let datetime = document.getElementById('datetime').value;
    let url = document.getElementById('url').value;
    return (countryCode == '' || languageCode == '' || datetime == '' || url == '' );
}

async function fetchURL (adsURL) {
    try{
        let response = await fetch(adsURL); 
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        let adJSON = await response.json();
        return adJSON;
    } catch (error) {
        console.error(`Was not able to fetch: ${error}`);
    }
}


function matchesCountry(clientCountryCode, adCountryCode) {
    return clientCountryCode.toLowerCase().trim() == adCountryCode;
}


function matchesLanguage(clientLanguageCode, adLanguageCode) {
    return clientLanguageCode.toLowerCase().trim() == adLanguageCode;
}


function isInTimeRange(clientDatetime, startHour, endHour) {
    let time = clientDatetime.split('T'); // pulls the 'time' only
    let hour_minute = time[1].split(':'); // breaks up 'hour' and 'minute'
    let hour = hour_minute[0]; // pulls the 'hour' only
     // if 12 AM --> 00
    // if 12 PM -- > 12 
    // if 1-11 PM --> +!2
    // if PM -- add 12 to hr                                                        
    // if filtered Ads empty // else alert user no result                                                   
    //console.log("HOUR:" + hour)
    if(endHour < startHour && hour < startHour) {
        startHour -= 24; 
    } else if(endHour < startHour) {
        endHour += 24;
    }
    return startHour <= hour && hour < endHour;
}

