const intro = document.querySelector('#intro');
const invitation = document.querySelector('#invitation');
const openButton = document.querySelector('#open-invitation');
const guestName = document.querySelector('#guest-name');

// Isi nama tamu dengan parameter URL, misalnya: ?to=Keluarga%20Budi
const guest = new URLSearchParams(window.location.search).get('to');
if (guest) guestName.textContent = guest;

openButton.addEventListener('click', () => {
  document.body.classList.add('is-open');
  invitation.classList.add('is-visible');
  invitation.setAttribute('aria-hidden', 'false');
  intro.classList.add('is-hidden');
  window.setTimeout(() => intro.remove(), 900);
});

// Atur tanggal acara di sini: format YYYY-MM-DDTHH:mm:ss+07:00
const weddingDate = new Date('2026-12-20T08:00:00+07:00').getTime();
const countdownUnits = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds'),
};

function updateCountdown() {
  const distance = weddingDate - Date.now();
  if (distance <= 0) {
    Object.values(countdownUnits).forEach((unit) => { unit.textContent = '00'; });
    return;
  }

  countdownUnits.days.textContent = String(Math.floor(distance / 86400000)).padStart(2, '0');
  countdownUnits.hours.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');
  countdownUnits.minutes.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
  countdownUnits.seconds.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

document.querySelector('#copy-account').addEventListener('click', async (event) => {
  const accountNumber = document.querySelector('#account-number').textContent.trim();
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(accountNumber);
    status.textContent = 'Nomor rekening berhasil disalin.';
  } catch {
    status.textContent = `Salin nomor ini: ${accountNumber}`;
  }
  event.currentTarget.textContent = 'Tersalin ✓';
  window.setTimeout(() => { event.currentTarget.textContent = 'Salin nomor'; }, 2200);
});

document.querySelector('#rsvp-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = formData.get('name').trim();
  const attendance = formData.get('attendance');
  const guests = formData.get('guests');
  // Ganti dengan nomor WhatsApp penerima, gunakan kode negara tanpa tanda +.
  const whatsappNumber = '6281234567890';
  const message = `Halo Raka & Nisa, saya ${name}. ${attendance} untuk acara pernikahan. Jumlah tamu: ${guests} orang.`;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
