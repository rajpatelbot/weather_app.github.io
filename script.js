const inputText = document.getElementById("inputText");
const search = document.getElementById("search");
let city = document.querySelector(".city");
let weatherIcon = document.getElementById("weatherIcon");
let temp = document.getElementById("temp");
let condition = document.getElementById("condition");
let msg = document.getElementById("msg");

search.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(inputText.value);
  inputText.value = "";
});

const getWeather = async (input_city) => {
  try {
    const responseData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input_city}&appid=430241d2a6d22e650f7f19c79d9760b1`,
      // { mode: "cors" }
    );
    const weatherData = await responseData.json();
    console.log(weatherData);
    const { name } = await weatherData;
    const { feels_like } = await weatherData.main;
    const { id, main } = await weatherData.weather[0];
    console.log(feels_like);
    console.log(id);
    console.log(main);
    console.log(city);

    city.textContent = name;
    condition.textContent = main;
    msg.style.display = "none";
    temp.textContent = Math.round(feels_like - 273)+`°C`;
    
    if (id < 300 && id >= 200) {
      weatherIcon.src = "./icons/storm.png";
    } else if (id < 600 && id >= 300) {
      weatherIcon.src = "./icons/rain.png";
    } else if (id < 700 && id >= 600) {
      weatherIcon.src = "./icons/ice-crystal.png";
    } else if (id < 800 && id >= 700) {
      weatherIcon.src = "./icons/mist.png";
    } else if (id == 800) {
      weatherIcon.src = "./icons/sun.png";
    } else if(id < 805 && id >= 801) {
      weatherIcon.src = "./icons/clouds.png";
    }
  } 
  catch (error) {
    alert("Please enter valid city name");
  }
};

// when the window is load then ask the permision to access the current location..
window.addEventListener("load", () => {
  let long;
  let lat;

  // const proxy = "https://cors-anywhere.herokuapp.com/";

  //by using this line of code it ask the permission..
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      
      //by using these two lines of code it takes the lat and long of the user..
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //api code..
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=430241d2a6d22e650f7f19c79d9760b1`;

      //this is help to fetch the data from the api in json format..
      fetch(api)
        .then((response) => {
          return response.json();
        })
        // convert the json data into normal form...
        .then((data) => {
          const { name } = data;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];

          city.textContent = name;
          condition.textContent = main;
          msg.style.display = "none";
          temp.textContent = Math.round(feels_like - 273)+`°C`;

          if (id < 300 && id >= 200) {
            weatherIcon.src = "./icons/storm.png";
          } else if (id < 600 && id >= 300) {
              weatherIcon.src = "./icons/rain.png";
          } else if (id < 700 && id >= 600) {
              weatherIcon.src = "./icons/ice-crystal.png";
          } else if (id < 800 && id >= 700) {
              weatherIcon.src = "./icons/mist.png";
          } else if (id == 800) {
              weatherIcon.src = "./icons/sun.png";
          } else if(id < 805 && id >= 801) {
              weatherIcon.src = "./icons/clouds.png";
          }
        });
    });
  }
});
