
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  const tabCalcBtn = document.getElementById('tabCalcBtn');
  const tabTrackBtn = document.getElementById('tabTrackBtn');
  const tabCalcContent = document.getElementById('tabCalcContent');
  const tabTrackContent = document.getElementById('tabTrackContent');

  if (tabCalcBtn && tabTrackBtn && tabCalcContent && tabTrackContent) {
    tabCalcBtn.addEventListener('click', () => {
      tabCalcBtn.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
      tabCalcBtn.classList.remove('text-slate-600', 'hover:text-slate-900');
      tabTrackBtn.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
      tabTrackBtn.classList.add('text-slate-600', 'hover:text-slate-900');

      tabCalcContent.classList.remove('hidden');
      tabTrackContent.classList.add('hidden');
    });

    tabTrackBtn.addEventListener('click', () => {
      tabTrackBtn.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
      tabTrackBtn.classList.remove('text-slate-600', 'hover:text-slate-900');
      tabCalcBtn.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
      tabCalcBtn.classList.add('text-slate-600', 'hover:text-slate-900');

      tabTrackContent.classList.remove('hidden');
      tabCalcContent.classList.add('hidden');
    });
  }

  const shippingModeSelect = document.getElementById('shippingMode');
  const volumeWeightLabel = document.getElementById('volumeWeightLabel');
  const volumeWeightInput = document.getElementById('volumeWeightInput');
  const volumeWeightUnit = document.getElementById('volumeWeightUnit');

  if (shippingModeSelect && volumeWeightLabel && volumeWeightInput && volumeWeightUnit) {
    shippingModeSelect.addEventListener('change', (e) => {
      const mode = e.target.value;
      if (mode === 'sea_fcl') {
        volumeWeightLabel.innerText = 'Tipe Kontainer';
        volumeWeightUnit.innerText = 'Unit';
        volumeWeightInput.placeholder = 'Jumlah Kontainer (misal: 1)';
        volumeWeightInput.value = '1';
        volumeWeightInput.min = '1';
        volumeWeightInput.step = '1';
      } else if (mode === 'air_express') {
        volumeWeightLabel.innerText = 'Estimasi Berat Kargo';
        volumeWeightUnit.innerText = 'Kg';
        volumeWeightInput.placeholder = 'Misal: 50';
        volumeWeightInput.value = '50';
        volumeWeightInput.min = '1';
        volumeWeightInput.step = '1';
      } else {
        volumeWeightLabel.innerText = 'Volume Kargo (CBM)';
        volumeWeightUnit.innerText = 'm³ (CBM)';
        volumeWeightInput.placeholder = 'Misal: 2.5';
        volumeWeightInput.value = '2.5';
        volumeWeightInput.min = '0.5';
        volumeWeightInput.step = '0.1';
      }
    });
  }

  const rateCalcForm = document.getElementById('rateCalcForm');
  const calcResultBox = document.getElementById('calcResultBox');
  const resultRoute = document.getElementById('resultRoute');
  const resultEstTime = document.getElementById('resultEstTime');
  const resultEstCost = document.getElementById('resultEstCost');
  const resultServiceNote = document.getElementById('resultServiceNote');
  const btnSendCalcWa = document.getElementById('btnSendCalcWa');

  if (rateCalcForm) {
    rateCalcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const origin = document.getElementById('originCountry').value;
      const destination = document.getElementById('destinationPort').value;
      const mode = document.getElementById('shippingMode').value;
      const amount = parseFloat(document.getElementById('volumeWeightInput').value) || 1;

      const routeData = {
        'CN': { name: 'China (Guangzhou/Ningbo/Yiwu)', seaDays: '10 - 14 Hari', airDays: '3 - 5 Hari', lclRate: 3200000, airRate: 145000, fclRate: 28500000 },
        'SG': { name: 'Singapura (PSA / Jurong)', seaDays: '3 - 5 Hari', airDays: '1 - 2 Hari', lclRate: 1800000, airRate: 95000, fclRate: 16000000 },
        'US': { name: 'Amerika Serikat (West/East Coast)', seaDays: '24 - 32 Hari', airDays: '5 - 7 Hari', lclRate: 5800000, airRate: 260000, fclRate: 52000000 },
        'JP': { name: 'Jepang (Tokyo / Yokohama)', seaDays: '12 - 16 Hari', airDays: '3 - 5 Hari', lclRate: 3900000, airRate: 185000, fclRate: 34000000 },
        'KR': { name: 'Korea Selatan (Busan / Incheon)', seaDays: '12 - 16 Hari', airDays: '3 - 5 Hari', lclRate: 3800000, airRate: 175000, fclRate: 33000000 },
        'EU': { name: 'Eropa (Hamburg / Rotterdam)', seaDays: '26 - 35 Hari', airDays: '5 - 8 Hari', lclRate: 5200000, airRate: 240000, fclRate: 49000000 }
      };

      const portNames = {
        'JKT': 'Jakarta (Tanjung Priok)',
        'SBY': 'Surabaya (Tanjung Perak)',
        'MDN': 'Medan (Belawan)',
        'SMG': 'Semarang (Tanjung Emas)',
        'MKS': 'Makassar (Soekarno-Hatta)'
      };

      const originInfo = routeData[origin] || routeData['CN'];
      const destName = portNames[destination] || 'Jakarta (Tanjung Priok)';

      let estTime = '';
      let totalEstCost = 0;
      let serviceTitle = '';

      if (mode === 'sea_fcl') {
        serviceTitle = 'Sea Freight FCL (Full Container)';
        estTime = originInfo.seaDays;
        totalEstCost = originInfo.fclRate * amount;
      } else if (mode === 'air_express') {
        serviceTitle = 'Air Freight Express';
        estTime = originInfo.airDays;
        totalEstCost = originInfo.airRate * amount;
      } else {
        serviceTitle = 'Sea Freight LCL (Konsolidasi)';
        estTime = originInfo.seaDays;
        totalEstCost = originInfo.lclRate * amount;
      }

      resultRoute.innerText = `${originInfo.name} ➔ ${destName}`;
      resultEstTime.innerText = estTime;
      resultEstCost.innerText = `Rp ${totalEstCost.toLocaleString('id-ID')} *`;
      resultServiceNote.innerText = `Layanan: ${serviceTitle} (${amount} ${volumeWeightUnit.innerText}). Sudah termasuk estimasi handling port & pengurusan dokumen standar.`;

      calcResultBox.classList.remove('hidden');

      const waMsg = `Halo Tim Nusantara Global Logistics, saya ingin konsultasi penawaran resmi untuk pengiriman:
- Rute: ${originInfo.name} ke ${destName}
- Moda: ${serviceTitle}
- Volume/Kuantitas: ${amount} ${volumeWeightUnit.innerText}
- Estimasi Kalkulator Web: Rp ${totalEstCost.toLocaleString('id-ID')}

Mohon informasi ketersediaan jadwal kapal/pesawat dan rincian dokumen kepabeanan yang dibutuhkan.`;

      btnSendCalcWa.href = `https://wa.me/6281234567890?text=${encodeURIComponent(waMsg)}`;

      calcResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  const trackForm = document.getElementById('trackForm');
  const trackResultContainer = document.getElementById('trackResultContainer');
  const trackCodeDisplay = document.getElementById('trackCodeDisplay');
  const trackStatusBadge = document.getElementById('trackStatusBadge');
  const trackProgressPct = document.getElementById('trackProgressPct');
  const trackProgressBar = document.getElementById('trackProgressBar');
  const timelineContainer = document.getElementById('timelineContainer');

  const trackingDatabase = {
    'NGL-882910': {
      code: 'NGL-882910',
      type: 'Sea Freight LCL (2.8 CBM)',
      origin: 'Guangzhou Port, China',
      destination: 'Tanjung Priok, Jakarta',
      vessel: 'WAN HAI 312 / V.082E',
      status: 'Pemeriksaan Bea Cukai (Customs Clearance)',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
      percent: 75,
      steps: [
        { title: 'Barang Diterima di Gudang Guangzhou', desc: 'Barang selesai dicek fisik, label barcode terpasang.', time: '14 Okt 2026, 10:15 WIB', done: true },
        { title: 'Stuffing & Muat Kapal (Port of Departure)', desc: 'Kontainer telah masuk kapal WAN HAI 312.', time: '16 Okt 2026, 18:30 WIB', done: true },
        { title: 'Kapal Bersandar di Tanjung Priok', desc: 'Kontainer diturunkan di dermaga JICT Tanjung Priok.', time: '21 Okt 2026, 08:45 WIB', done: true },
        { title: 'Proses Dokumen PPJK & Bea Cukai', desc: 'Sedang validasi SPPB (Surat Persetujuan Pengeluaran Barang).', time: '22 Okt 2026, 09:20 WIB', current: true },
        { title: 'Pengiriman Akhir ke Gudang Penerima', desc: 'Armada trucking dijadwalkan menuju Jakarta Barat.', time: 'Estimasi: 23 Okt 2026', done: false }
      ]
    },
    'NGL-554102': {
      code: 'NGL-554102',
      type: 'Air Freight Express (85 Kg)',
      origin: 'Changi Airport, Singapura',
      destination: 'Juanda Airport, Surabaya',
      vessel: 'Garuda Indonesia GA-855',
      status: 'Selesai - Telah Diterima',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      percent: 100,
      steps: [
        { title: 'Pick up dari Supplier Singapura', desc: 'Pengambilan kargo langsung dari factory Jurong.', time: '19 Okt 2026, 11:00 WIB', done: true },
        { title: 'Departure Changi Cargo Terminal', desc: 'Kargo diterbangkan via GA-855.', time: '19 Okt 2026, 19:20 WIB', done: true },
        { title: 'Tiba di Bandara Juanda Surabaya', desc: 'Kargo tiba dan proses manifest import clearance.', time: '20 Okt 2026, 02:10 WIB', done: true },
        { title: 'Customs Cleared & SPPB Rilis', desc: 'Pajak impor selesai diverifikasi & barang rilis.', time: '20 Okt 2026, 10:00 WIB', done: true },
        { title: 'Barang Diterima Pemilik (Delivered)', desc: 'Diterima oleh Bpk. Budi Santoso (PT Surabaya Jaya).', time: '21 Okt 2026, 14:15 WIB', done: true }
      ]
    },
    'NGL-110293': {
      code: 'NGL-110293',
      type: 'Sea Freight FCL 40ft High Cube',
      origin: 'Port of Los Angeles, USA',
      destination: 'Tanjung Perak, Surabaya',
      vessel: 'MAERSK MC-KINNEY MOLLER',
      status: 'Dalam Pelayaran Samudera (On Vessel)',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
      percent: 45,
      steps: [
        { title: 'Container Pick-Up & Stuffing USA', desc: 'Muatan mesin industri telah disegel di California.', time: '05 Okt 2026, 15:00 UTC', done: true },
        { title: 'Kapal Berlayar dari Port of Los Angeles', desc: 'Pelayaran lintas Samudera Pasifik dimulai.', time: '08 Okt 2026, 21:00 UTC', done: true },
        { title: 'Transit Transshipment Hub Singapore', desc: 'Estimasi pergantian kapal feeder tujuan Surabaya.', time: 'Estimasi: 26 Okt 2026', done: false },
        { title: 'Tiba di Pelabuhan Tanjung Perak', desc: 'Pemberitahuan Pabean Impor (PIB) siap diajukan.', time: 'Estimasi: 30 Okt 2026', done: false },
        { title: 'Pengantaran Door-to-Door ke Pabrik', desc: 'Trucking kontainer 40ft ke Kawasan Industri Rungkut.', time: 'Estimasi: 02 Nov 2026', done: false }
      ]
    }
  };

  function renderTracking(data) {
    trackCodeDisplay.innerText = data.code;
    trackStatusBadge.className = `px-3 py-1 rounded-full text-xs font-semibold border ${data.statusColor}`;
    trackStatusBadge.innerText = data.status;

    trackProgressPct.innerText = `${data.percent}%`;
    trackProgressBar.style.width = `${data.percent}%`;

    timelineContainer.innerHTML = '';
    data.steps.forEach((step, idx) => {
      let iconColor = 'bg-slate-200 text-slate-500 border-slate-300';
      if (step.done) {
        iconColor = 'bg-emerald-600 text-white border-emerald-600';
      } else if (step.current) {
        iconColor = 'bg-amber-500 text-white border-amber-500 ring-4 ring-amber-100 animate-pulse';
      }

      const itemHtml = `
        <div class="relative flex items-start gap-4 pb-6 last:pb-0">
          <div class="relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 ${iconColor} flex items-center justify-center font-bold text-xs">
            ${step.done ? '✓' : (idx + 1)}
          </div>
          <div class="flex-1 pt-0.5">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h4 class="text-sm font-bold text-slate-900">${step.title}</h4>
              <span class="text-xs text-slate-500 font-medium">${step.time}</span>
            </div>
            <p class="text-xs text-slate-600 mt-1">${step.desc}</p>
          </div>
        </div>
      `;
      timelineContainer.insertAdjacentHTML('beforeend', itemHtml);
    });

    trackResultContainer.classList.remove('hidden');
    trackResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (trackForm) {
    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const codeInput = document.getElementById('trackNumberInput').value.trim().toUpperCase();

      if (trackingDatabase[codeInput]) {
        renderTracking(trackingDatabase[codeInput]);
      } else {
        const simulated = {
          code: codeInput || 'NGL-EXPRESS',
          type: 'Kargo Internasional Terdaftar (Sea/Air)',
          origin: 'International Port Hub',
          destination: 'Pelabuhan Tujuan Indonesia',
          vessel: 'GLOBAL FREIGHT CARRIER',
          status: 'Dalam Proses Logistik Berjalan',
          statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
          percent: 60,
          steps: [
            { title: 'Order Terdaftar & Dokumen Valid', desc: 'Bill of Lading / Airway Bill telah terkonfirmasi di sistem.', time: '3 Hari Lalu', done: true },
            { title: 'Muat & Berangkat dari Pelabuhan Asal', desc: 'Barang dalam perjalanan logistik terpadu.', time: '1 Hari Lalu', done: true },
            { title: 'Manifestasi Kepabeanan & Bea Cukai', desc: 'Pengecekan jalur kepabeanan (Green/Yellow/Red Line).', time: 'Hari Ini (In Progress)', current: true },
            { title: 'Pelepasan Kargo & Pengantaran Lokal', desc: 'Armada siap antar setelah SPPB diterbitkan.', time: 'Segera', done: false }
          ]
        };
        renderTracking(simulated);
      }
    });

    document.querySelectorAll('.sample-track-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.currentTarget.getAttribute('data-code');
        document.getElementById('trackNumberInput').value = code;
        if (trackingDatabase[code]) {
          renderTracking(trackingDatabase[code]);
        }
      });
    });
  }

  const faqButtons = document.querySelectorAll('.faq-toggle');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const content = parent.querySelector('.faq-content');
      const icon = btn.querySelector('.faq-icon');
      const isOpen = content.classList.contains('open');

      document.querySelectorAll('.faq-content').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate'));

      if (!isOpen) {
        content.classList.add('open');
        if (icon) icon.classList.add('rotate');
      }
    });
  });

  const quoteForm = document.getElementById('quoteForm');
  const quoteSuccessToast = document.getElementById('quoteSuccessToast');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value;
      const company = document.getElementById('contactCompany').value;
      const phone = document.getElementById('contactPhone').value;
      const email = document.getElementById('contactEmail').value;
      const service = document.getElementById('contactService').value;
      const description = document.getElementById('contactMessage').value;

      const formattedMsg = `*Permintaan Penawaran Ekspor-Impor - NGL Freight*
---------------------------------------
Nama: ${name}
Perusahaan: ${company || '-'}
No. HP / WA: ${phone}
Email: ${email || '-'}
Layanan Diminati: ${service}
Detail Kargo & Kebutuhan:
${description}
---------------------------------------
(Dikirim via formulir resmi landing page)`;

      const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(formattedMsg)}`;
      window.open(waUrl, '_blank');

      if (quoteSuccessToast) {
        quoteSuccessToast.classList.remove('hidden');
        setTimeout(() => {
          quoteSuccessToast.classList.add('hidden');
        }, 6000);
      }

      quoteForm.reset();
    });
  }
});
