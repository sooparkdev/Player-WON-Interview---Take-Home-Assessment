
import fetch from 'node-fetch'

async function getMatchingAds(countryCode, languageCode, datetime, adsURL) {
    let fetchResult = await fetchURL(adsURL);
    let filteredAds = fetchResult.ads.filter(ad => { return matchesCountry(countryCode, ad.country) &&
                                                            matchesLanguage(languageCode, ad.lang) &&
                                                            isInTimeRange(datetime, ad.start_hour, ad.end_hour) } );
    let num = 1;
    let pulledAdInfo = filteredAds.map(ad => { return `<Ad ${num++}> \nID: ${ad.id} \nAd Video Url:  ${ad.video_url}`}).join('\n\n');
    return pulledAdInfo;  
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
    return clientCountryCode.toLowerCase() == adCountryCode;
}

function matchesLanguage(clientLanguageCode, adLanguageCode) {
    return clientLanguageCode.toLowerCase() == adLanguageCode;
}

function isInTimeRange(clientDatetime, startHour, endHour) {
    let time = clientDatetime.split('T'); // pulls the 'time' only
    let hour_minute = time[1].split(':'); // breaks up 'hour' and 'minute'
    let hour = hour_minute[0]; // pulls the 'hour' only
    //console.log("HOUR:" + hour)
    if(endHour < startHour && hour < startHour) {
        startHour -= 24; 
    } else if(endHour < startHour) {
        endHour += 24;
    }
    return startHour <= hour && hour < endHour;
}


// MAIN
let availableAds = await getMatchingAds("US", "Eng", "2017-06-01T08:30", "https://gist.githubusercontent.com/victorhurdugaci/22a682eb508e65d97bd5b9152f564ab3/raw/dbf27ef217dba9bbd753de26cdabf8a91bdf1550/sm_ads.json");
console.log(availableAds);

