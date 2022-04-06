

# Simulmedia PlayerWON's Take Home Assessment - Soo Park
<strong> Version 1 </strong>, I designed a simple program with Javascript. The solution can be seen within the app.js file. <br>
<strong> Version 2 </strong>, I incorporated a basic client-side design to the program. Please run index.html file on a local device to see the implementation on a browser. The index.html can be found under 'public' folder. 


# Assessment Infomration

For the next interview step, you need to write a bit of code. Once you've completed the problem and submitted your solution, we'll schedule a 45 minute call with a PlayerWON engineer to present it. During the call you will be asked to explain your approach and the engineer will ask you questions about it.

## Description of the problem

Advertisers would like to run ads that target video game players based on the country they're in and the language they speak. 

The ask is to **implement a program** that takes a few inputs:
- A two-letter country code (https://www.nationsonline.org/oneworld/country_code_list.htm)
- A three-letter language code (https://www.loc.gov/standards/iso639-2/php/code_list.php)
- A date and time
- An ads manifest. This is JSON object describing the available ads (see below). You can read it from a file or from the URL below, up to you.

The program determine which ads can be shows at the given **date/time** for the specified **country** and **language**. It should return the **id** and **url** of the available ads, if any.

## Ads manifest

The ads manifest is a JSON object describing the available ads.

You can download such a manifest from: `https://gist.githubusercontent.com/victorhurdugaci/22a682eb508e65d97bd5b9152f564ab3/raw/dbf27ef217dba9bbd753de26cdabf8a91bdf1550/sm_ads.json`

Example:

```
{
    "ads": [
        {
            "id": "59d4fb16",
            "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "country": "us",
            "lang": "eng",
            "start_hour": 1,
            "end_hour": 14
        },
        {
            "id": "f75d5ea7",
            "video_url": "https://www.youtube.com/watch?v=QH2-TGUlwu4",
            "country": "us",
            "lang": "eng",
            "start_hour": 2,
            "end_hour": 18
        },
        ...

```

Each entry in the list represents an ad:
1. `id`: A unique identifier for the ad
1. `video_url`: The url to the video
1. `lang`: The language of the ad (https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes)
1. `country`: The country in which the ad should be displayed (https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
1. `start_hour`: The hour of the day (0-23) at which this ad becomes available. Examples:
    - `2` = the ad is available starting at `2:00:00AM`
    - `23` = the ad is available starting at `11:00:00PM`
1. `end_hour`: The hour of the day (0-23) at which this ad stops being available. Examples:
    - `2` = the ad is available until `1:59:59AM` (inclusive)
    - `23` = the ad is available until `10:59:59PM` (inclusive)
    - `0` = the ad is available until `11:59:59PM` (inclusive)

### Example ad:

```
    {
        "id": "59d4fb16", 
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "country": "us",
        "lang": "eng",
        "start_hour": 1,
        "end_hour": 14
    },
```

This ad is available in the `US`, for  `English` speakers, between `1:00:00AM` and `1:59:59PM` (inclusive).

## Notes

- You can use the programming language of your choice
- Assume all times are UTC
- Please be prepared to describe how you would test such a program and/or provide some unit tests as part of your submission

## How to submit your solution

- Send your code to us either thourgh email or a GitHub repository
- If you use GitHub, consider making the repository private and share it with `@victorhurdugaci`