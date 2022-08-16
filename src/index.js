//Universal variables, because I'll access them multiple times

let apikey = "1636fb578947f1db83721ae094837fc3";

function far2cel(event) {
  event.preventDefault();

  let templogo = document.querySelectorAll(".tempLogo");
  let templogo_arr = Array.from(templogo);

  let tempvalueElement = document.querySelectorAll(".tempValue");
  let tempvalueElement_arr = Array.from(tempvalueElement);

  templogo_arr.forEach(function (degrees) {
    if (degrees.innerHTML === "C") {
      degrees.innerHTML = "F";
    } else {
      degrees.innerHTML = "C";
    }
  });
}

let handletemp = document.querySelectorAll(".tempLogo");

handletemp[0].addEventListener("click", far2cel);
handletemp[1].addEventListener("click", far2cel);
handletemp[2].addEventListener("click", far2cel);
handletemp[3].addEventListener("click", far2cel);
handletemp[4].addEventListener("click", far2cel);

//Handling location button

function handleLocation() {
  navigator.geolocation.getCurrentPosition(callByGeo);
}

function callByGeo(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let geoapicall = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;

  function placeNamebyGeo(response) {
    let geocityname = response.data.name;
    let cityNamePlaceholders = document.querySelectorAll(
      "span.city-name-placeholder"
    );
    let cityplaceholders_arr = Array.from(cityNamePlaceholders);

    cityplaceholders_arr.forEach(function (placing) {
      placing.innerHTML = geocityname;
    });

    let heading = document.querySelector("h1");
    heading.innerHTML = `Here's The Weather In ${geocityname}`;
  }

  axios.get(geoapicall).then(placeNamebyGeo);

  gettemp(lat, lon);
}

let getlocation = document.querySelector("#locbutton");
getlocation.addEventListener("click", handleLocation);

// Handling Search

function placingCityName(event) {
  event.preventDefault();

  let cityNameInput = document.querySelector("#search-box-input");
  let cityName = cityNameInput.value;

  let cityNamePlaceholders = document.querySelectorAll(
    "span.city-name-placeholder"
  );
  let cityplaceholders_arr = Array.from(cityNamePlaceholders);

  cityplaceholders_arr.forEach(function (placing) {
    placing.innerHTML = cityName;
  });

  let heading = document.querySelector("h1");
  heading.innerHTML = `Here's The Weather In ${cityName}`;
  convertCityName(cityName);
}

let barsearch = document.querySelector("#search-bar"); // handle search event listener
barsearch.addEventListener("submit", placingCityName, convertCityName);

function convertCityName(name) {
  let apikey = "1636fb578947f1db83721ae094837fc3";
  let geocall = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=2&appid=${apikey}`;

  function getlatlon(response) {
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;
    console.log(`${lat},${lon}`);
    gettemp(lat, lon);
  }

  axios.get(geocall).then(getlatlon); // sending fot lat lon
}

function gettemp(lat, lon) {
  let apikey = "1636fb578947f1db83721ae094837fc3";
  let weathercall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apikey}`; //test with metric

  function fetchweather(response) {
    let fulltempnow = response.data.current.temp;
    let tempnow = Math.round(fulltempnow);

    let fulltempnight = response.data.daily[0].temp.night;
    let tempnight = Math.round(fulltempnight);

    let fulltemptomorrow = response.data.daily[1].temp.day;
    let temptomorrow = Math.round(fulltemptomorrow);

    let fulltempday3 = response.data.daily[2].temp.day;
    let tempday3 = Math.round(fulltempday3);

    let fulltempday4 = response.data.daily[3].temp.day;
    let tempday4 = Math.round(fulltempday4);

    let tempreturnnow = document.querySelector("#temp-now");
    tempreturnnow.innerHTML = `${tempnow}`;

    let tempreturnnight = document.querySelector("#temp-two");
    tempreturnnight.innerHTML = `${tempnight}`;

    let tempreturntom = document.querySelector("#temp-three");
    tempreturntom.innerHTML = `${temptomorrow}`;

    let tempreturn3 = document.querySelector("#temp-four");
    tempreturn3.innerHTML = `${tempday3}`;

    let tempreturn4 = document.querySelector("#temp-five");
    tempreturn4.innerHTML = `${tempday4}`;

    let timecode3 = response.data.daily[2].dt;
    let timecode4 = response.data.daily[3].dt;
    console.log(timecode3);
    console.log(timecode4);

    let return3 = dayFormatting(timecode3);
    let return4 = dayFormatting(timecode4);

    let subheading3 = document.querySelector("#day-3");
    subheading3.innerHTML = return3;

    let subheading4 = document.querySelector("#day-4");
    subheading4.innerHTML = return4;

    console.log(response.data);
  }

  function dayFormatting(code) {
    let fulldate = new Date(code * 1000);
    let data = fulldate.getDate();
    if (data === 1) {
      data = `1st`;
    } else {
      if (data === 2) {
        data = `2nd`;
      } else {
        if (data === 3) {
          data = `3rd`;
        } else {
          data = `${data}th`;
        }
      }
    }

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[fulldate.getDay()];
    let dateheading = `on ${data}, ${day}`;
    return dateheading;
  }

  axios.get(weathercall).then(fetchweather);
}

//let converter = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=2&appid=${apikey}`;

//my apicall for weather = https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&appid=1636fb578947f1db83721ae094837fc3

//  axios.get(converter).then(handleurl);

// temp now with name section https://api.openweathermap.org/data/2.5/weather?lat=-37.8128&lon=145.0344&appid=1636fb578947f1db83721ae094837fc3&units=metric
