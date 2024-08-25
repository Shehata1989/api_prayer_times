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

      // ابحث عن اسم المدينة الصحيح في الـ array
      const selectedCity = array.find(
        (city) => city.cityName === e.target.textContent
      );

      if (selectedCity) {
        document.getElementById("city").textContent = selectedCity.cityName;
        getTimingsByCity(selectedCity.name); // مرر الاسم الإنجليزي للمدينة
      }
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
    name: "Damietta",
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

function updateTime() {
  let dateNow = new Date();

  let hours = dateNow.getHours();
  let minutes = dateNow.getMinutes().toString().padStart(2, "0");
  let seconds = dateNow.getSeconds().toString().padStart(2, "0");
  let milliseconds = dateNow.getMilliseconds().toString().padStart(3, "0");

  let period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  let fullTime = `${period} ${hours}:${minutes}:${seconds}`;

  // تحديث عنصر في الصفحة بالوقت
  document.getElementById("dateNow").textContent = fullTime;
}

// تحديث الوقت كل ثانية
setInterval(updateTime, 1000);

// استدعاء الوظيفة مرة واحدة عند التحميل الأولي للصفحة
updateTime();

function getTimingsByCity(country) {
  let params = {
    city: "EG",
    country: country,
  };

  const url = `https://api.aladhan.com/v1/timingsByCity?city=EG&country=${country}`;

  axios
    .get(url, { params: params })
    .then((response) => {
      const myData = [response.data.data];

      for (data of myData) {
        function time12(timeApi) {
          let time24 = timeApi;
          let [hours, minutes] = time24.split(":");
          hours = parseInt(hours, 10);

          let period = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;
          return `${hours}:${minutes} ${period}`;
        }

        fillTime("Fajr", time12(data.timings.Fajr));
        fillTime("Dhuhr", time12(data.timings.Dhuhr));
        fillTime("Asr", time12(data.timings.Asr));
        fillTime("Maghrib", time12(data.timings.Maghrib));
        fillTime("Isha", time12(data.timings.Isha));
      }

      document.getElementById("date").textContent =
        data.date.hijri.weekday.ar + " " + data.date.readable;
    })
    .catch((error) => {
      console.error("Error fetching data from API:", error);
    });
}

getTimingsByCity();

function fillTime(id, time) {
  document.getElementById(id).textContent = time;
}
