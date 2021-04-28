let weather = {
    apiKey: "c7056f34939173acbc8ae4816aab7fd7",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("Enter valid city, no weather found.");
            throw new Error("Enter valid city, no weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, temp_min, temp_max, humidity} = data.main;
      document.querySelector(".city").innerText = name;
      document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
         "Humidity: " + humidity + "%";
      document.querySelector(".temp_min").innerText = "Low: " + temp_min + "°C";
      document.querySelector(".temp_max").innerText = "High: " + temp_max + "°C";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Toronto");
