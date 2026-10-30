// ==========================================
// 1. ЛОГИКА ОТКРЫТИЯ КОНВЕРТА И МУЗЫКИ
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const welcomeScreen = document.getElementById("welcome-screen");
  const envelope = document.getElementById("envelope");

  if (welcomeScreen && envelope) {
    welcomeScreen.addEventListener("click", function () {
      // 1. Запускаем анимацию открытия конверта
      envelope.classList.add("open-flap");

      // 2. Включаем музыку (если она добавлена в HTML)
      const music = document.getElementById("bg-music");
      if (music) {
        // Обрабатываем возможную ошибку автовоспроизведения
        let playPromise = music.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Браузер заблокировал автозапуск музыки:", error);
          });
        }
      }

      // 3. Ждем, пока клапан откроется (0.8 сек), и убираем экран
      setTimeout(() => {
        welcomeScreen.classList.add("open-screen");

        // Полностью скрываем через 1 секунду, чтобы он не мешал кликам
        setTimeout(() => {
          welcomeScreen.style.display = "none";
        }, 1000);
      }, 800); // 800мс = время, за которое открывается клапан
    });
  }
});

// ==========================================
// 2. ЛОГИКА ТАЙМЕРА ОБРАТНОГО ОТСЧЕТА
// ==========================================
// Устанавливаем дату события: 3 ноября 2026 года, 18:00
// Формат: 'YYYY-MM-DDTHH:mm:ss'
const eventDate = new Date("2026-11-03T18:00:00").getTime();

// Обновляем таймер каждую секунду
const timer = setInterval(function () {
  // Текущее время
  const now = new Date().getTime();

  // Разница между датой события и текущим временем
  const distance = eventDate - now;

  // Если время вышло, останавливаем таймер
  if (distance < 0) {
    clearInterval(timer);
    const countdownEl = document.getElementById("countdown");
    if (countdownEl) {
      countdownEl.innerHTML =
        "<h3 style='font-size: 16px; color: #7b1a1a; width: 100%; text-align: center;'>Праздник уже начался! 🎉</h3>";
    }
    return;
  }

  // Вычисления для дней, часов, минут и секунд
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Проверяем, есть ли элементы на странице, прежде чем менять их текст
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
  if (hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
  if (minutesEl) minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
  if (secondsEl) secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
}, 1000);
