const apiKey = "bcd5ee6aa71d7a9d59e241d47667cd05"; // Thay bằng key thật nếu cần
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    if (!city.trim()) return; // không gọi nếu ô trống

    // 🔧 Dùng template literal đúng cách (backticks) để chèn API key
    const response = await fetch(
      `${apiUrl}${encodeURIComponent(city)}&appid=${apiKey}`
    );

    const data = await response.json();
    // console.log(data); // để kiểm tra

    // ❌ Nếu API trả lỗi (vd: 401 hoặc 404)
    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";

      // Nếu muốn hiển thị thông báo cụ thể:
      if (response.status === 401) {
        document.querySelector(".error").textContent =
          "❌ Lỗi: API key không hợp lệ hoặc chưa kích hoạt.";
      } else if (response.status === 404) {
        document.querySelector(".error").textContent =
          "❌ Không tìm thấy thành phố.";
      } else {
        document.querySelector(".error").textContent = `❌ Lỗi API: ${
          data.message || response.status
        }`;
      }
      return;
    }

    // ✅ Nếu dữ liệu hợp lệ
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // 🖼️ Thay đổi icon dựa trên tình trạng thời tiết
    const weather = data.weather[0].main;
    if (weather === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (weather === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (weather === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (weather === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (weather === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else {
      weatherIcon.src = "images/default.png"; // fallback nếu không trùng
    }

    // ✅ Hiển thị kết quả, ẩn lỗi
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (err) {
    console.error("Lỗi mạng:", err);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".error").textContent =
      "⚠️ Lỗi kết nối. Vui lòng thử lại.";
    document.querySelector(".weather").style.display = "none";
  }
}

// 👇 Gọi hàm khi nhấn nút
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// 👇 Hoặc ấn Enter cũng được
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
