const dropdownToggle = document.getElementById("dropdownToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

document.addEventListener("DOMContentLoaded", () => {
  dropdownToggle.children[0].textContent = dropdownMenu.children[0].textContent;
  document.getElementById("city").textContent =
  dropdownMenu.children[0].textContent;

  // Toggle dropdown menu
  dropdownToggle.addEventListener("click", () => {
    dropdownToggle.classList.toggle("open");
    dropdownMenu.classList.toggle("open");
  });

  // Handle option selection
  dropdownMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      dropdownToggle.children[0].textContent = e.target.textContent;
      dropdownToggle.classList.remove("open");
      dropdownMenu.classList.remove("open");

      // Get city name from the selected item
      const countryName = e.target.textContent;
      document.getElementById("city").textContent = e.target.textContent;

      // Call the API with the selected city name
      getTimingsByCity(countryName);
    }
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (
      !dropdownToggle.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      dropdownToggle.classList.remove("open");
      dropdownMenu.classList.remove("open");
    }
  });
});

// #######################################################

const array = [
  {
    cityName: "القاهرة",
    name: "Al Qahirah",
  },
  {
    cityName: "الاسكندريه",
    name: "Al Iskandariyah",
  },
  {
    cityName: "اسوان",
    name: "Aswan",
  },
  {
    cityName: "اسيوط",
    name: "Asyut",
  },
  {
    cityName: "الاقصر",
    name: "Al Uqşur",
  },
  {
    cityName: "دمياط",
    name: "	Dumyat",
  },
  {
    cityName: "بورسعيد",
    name: "	Bur Sa'id",
  },

];

for (let city = 0; city < array.length; city++) {
  const content = `
  <li>${array[city].cityName}</li>
  `;
  dropdownMenu.innerHTML += content;
}

// #######################################################

function getTimingsByCity(country) {
  let params = {
    city: "EG",
    country: country,
  };

  const url =
    "http://api.aladhan.com/v1/timingsByCity?city=EG&country=Al Iskandariyah";

  axios.get(url, { params: params }).then((response) => {
    const myData = [response.data.data];

    for (data of myData) {
      fillTime("Fajr", data.timings.Fajr);
      fillTime("Dhuhr", data.timings.Dhuhr);
      fillTime("Asr", data.timings.Asr);
      fillTime("Maghrib", data.timings.Maghrib);
      fillTime("Isha", data.timings.Isha);
    }

    document.getElementById("date").textContent =
      data.date.hijri.weekday.ar + " " + data.date.readable;
  });
}

getTimingsByCity();

function fillTime(id, time) {
  document.getElementById(id).textContent = time;
}
