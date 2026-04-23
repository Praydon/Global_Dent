/* ==========================================================================
   GLOBAL DENT — main.js
   ========================================================================== */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Header scroll state
  // -------------------------------------------------------------------------
  const header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // -------------------------------------------------------------------------
  // 2. Burger / mobile nav
  // -------------------------------------------------------------------------
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('is-open');
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.classList.toggle('nav-open', open);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      document.body.classList.remove('nav-open');
    });
  });

  // -------------------------------------------------------------------------
  // 3. Smooth scroll for anchor links
  // -------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Intersection Observer — fade-in animations
  // -------------------------------------------------------------------------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Observe all .animate-in EXCEPT hero (hero uses CSS animation directly)
  document.querySelectorAll('.animate-in').forEach(el => {
    if (!el.closest('.hero')) {
      io.observe(el);
    }
  });

  // -------------------------------------------------------------------------
  // 5. Count-up numbers
  // -------------------------------------------------------------------------
  function countUp(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const step = 16;
    const steps = Math.ceil(duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += Math.ceil(target / steps);
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, step);
  }

  const countIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        countIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.count-up').forEach(el => countIo.observe(el));

  // -------------------------------------------------------------------------
  // 6. Reviews carousel
  // -------------------------------------------------------------------------
  (function initCarousel() {
    const track  = document.getElementById('reviewsTrack');
    const dotsEl = document.getElementById('reviewDots');
    const prev   = document.getElementById('reviewPrev');
    const next   = document.getElementById('reviewNext');
    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.review-card'));
    let current = 0;

    function getVisible() {
      const w = window.innerWidth;
      // match CSS breakpoints: 1024px -> 3, 640px -> 2
      if (w >= 1024) return 3;
      if (w >= 640) return 2;
      return 1;
    }

    // Build dots
    function buildDots() {
      dotsEl.innerHTML = '';
      const visible = getVisible();
      const max = cards.length - visible;
      for (let i = 0; i <= max; i++) {
        const btn = document.createElement('button');
        btn.className = 'reviews__dot' + (i === current ? ' is-active' : '');
        btn.setAttribute('aria-label', 'Отзыв ' + (i + 1));
        btn.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(btn);
      }
    }
    buildDots();

    window.addEventListener('resize', () => {
      clearTimeout(window.reviewResizeTimer);
      window.reviewResizeTimer = setTimeout(() => {
        const max = cards.length - getVisible();
        if (current > max) current = max;
        buildDots();
        goTo(current);
      }, 150);
    });

    function goTo(index) {
      const visible = getVisible();
      const max = cards.length - visible;
      current = Math.max(0, Math.min(index, max));

      const cardWidth = cards[0].offsetWidth + 20; // gap 20px
      track.scrollTo({ left: current * cardWidth, behavior: 'smooth' });

      dotsEl.querySelectorAll('.reviews__dot').forEach((d, i) => {
        d.classList.toggle('is-active', i === current);
      });
    }

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    // Auto-play
    let autoplay = setInterval(() => goTo(current + 1 > cards.length - getVisible() ? 0 : current + 1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(current + 1 > cards.length - getVisible() ? 0 : current + 1), 5000);
    });

    // Update current on manual scroll
    track.addEventListener('scroll', () => {
      if (!cards[0]) return;
      const cardWidth = cards[0].offsetWidth + 20;
      current = Math.round(track.scrollLeft / cardWidth);
      dotsEl.querySelectorAll('.reviews__dot').forEach((d, i) => {
        d.classList.toggle('is-active', i === current);
      });
    }, { passive: true });
  })();

  // -------------------------------------------------------------------------
  // 7. Phone mask  +7 (___) ___-__-__
  // -------------------------------------------------------------------------
  const phoneInput = document.getElementById('fPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      let val = this.value.replace(/\D/g, '');
      if (val.startsWith('8')) val = '7' + val.slice(1);
      if (!val.startsWith('7')) val = '7' + val;
      val = val.slice(0, 11);

      let formatted = '+7';
      if (val.length > 1) formatted += ' (' + val.slice(1, 4);
      if (val.length >= 4) formatted += ') ' + val.slice(4, 7);
      if (val.length >= 7) formatted += '-' + val.slice(7, 9);
      if (val.length >= 9) formatted += '-' + val.slice(9, 11);

      this.value = formatted;
    });

    phoneInput.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && this.value === '+7') {
        e.preventDefault();
      }
    });

    phoneInput.addEventListener('focus', function () {
      if (!this.value) this.value = '+7 ';
    });
  }

  // -------------------------------------------------------------------------
  // 8. Appointment multi-step form
  // -------------------------------------------------------------------------
  (function initAppointmentFlow() {
    var stepForm     = document.getElementById('apptStepForm');
    var stepDatetime = document.getElementById('apptStepDatetime');
    var stepSuccess  = document.getElementById('apptStepSuccess');
    var form         = document.getElementById('appointmentForm');
    if (!form) return;

    var selectedDoctor   = null;
    var selectedDate     = null;
    var selectedTimeSlot = null;
    var currentMonth     = new Date().getMonth();
    var currentYear      = new Date().getFullYear();

    var MONTH_NAMES = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    var DAY_NAMES_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    function showStep(step) {
      [stepForm, stepDatetime, stepSuccess].forEach(function(s) {
        s.hidden = true;
      });
      step.hidden = false;
    }

    // --- Doctor Picker (inline dropdown) ---
    var doctorPicker     = document.getElementById('doctorPicker');
    var doctorPickerText = document.getElementById('doctorPickerText');
    var doctorDropdown   = document.getElementById('doctorDropdown');
    var doctorDropdownOpen = false;

    function toggleDoctorDropdown() {
      doctorDropdownOpen = !doctorDropdownOpen;
      doctorDropdown.classList.toggle('is-open', doctorDropdownOpen);
      doctorPicker.classList.toggle('is-open', doctorDropdownOpen);
    }

    function closeDoctorDropdown() {
      doctorDropdownOpen = false;
      doctorDropdown.classList.remove('is-open');
      doctorPicker.classList.remove('is-open');
    }

    doctorPicker.addEventListener('click', function () {
      toggleDoctorDropdown();
    });

    document.addEventListener('click', function (e) {
      var wrap = document.getElementById('doctorDropdownWrap');
      if (doctorDropdownOpen && !wrap.contains(e.target)) {
        closeDoctorDropdown();
      }
    });

    doctorDropdown.addEventListener('click', function (e) {
      var option = e.target.closest('.doc-option');
      if (!option) return;

      doctorDropdown.querySelectorAll('.doc-option').forEach(function(o) {
        o.classList.remove('is-selected');
      });
      option.classList.add('is-selected');

      selectedDoctor = {
        id:   option.dataset.doctorId,
        name: option.dataset.doctorName,
        spec: option.dataset.doctorSpec
      };

      selectedDate = null;
      selectedTimeSlot = null;
      var dtText = document.getElementById('datetimePickerText');
      dtText.textContent = 'Выберите желаемый день и время приема';
      dtText.classList.remove('is-filled');

      doctorPickerText.textContent = selectedDoctor.name;
      doctorPickerText.classList.add('is-filled');

      var dtPicker = document.getElementById('datetimePicker');
      dtPicker.classList.remove('form__picker--disabled');

      closeDoctorDropdown();
    });

    // --- Date/Time Picker ---
    var datetimePicker = document.getElementById('datetimePicker');
    var datetimeHint   = document.getElementById('datetimeHint');
    var datetimeBack   = document.getElementById('datetimeBack');

    datetimePicker.addEventListener('click', function () {
      if (!selectedDoctor) {
        datetimeHint.hidden = false;
        setTimeout(function() { datetimeHint.hidden = true; }, 3000);
        return;
      }
      var label = document.getElementById('calDoctorLabel');
      label.textContent = 'Врач ' + selectedDoctor.name + ' ' + selectedDoctor.spec;

      currentMonth = new Date().getMonth();
      currentYear  = new Date().getFullYear();
      renderCalendar();
      renderTimeSlots();
      showStep(stepDatetime);
    });

    datetimeBack.addEventListener('click', function () {
      showStep(stepForm);
    });

    // --- Calendar ---
    var calGrid       = document.getElementById('calGrid');
    var calMonthLabel = document.getElementById('calMonthLabel');
    var calPrev       = document.getElementById('calPrev');
    var calNext       = document.getElementById('calNext');

    calPrev.addEventListener('click', function () {
      currentMonth--;
      if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      renderCalendar();
    });

    calNext.addEventListener('click', function () {
      currentMonth++;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      renderCalendar();
    });

    function getDoctorSchedule(date) {
      var day = date.getDay();
      if (day === 0) return null;
      if (day === 3) return null;
      if (day === 6) return { start: 9, end: 15 };
      return { start: 9, end: 18 };
    }

    function renderCalendar() {
      calMonthLabel.textContent = MONTH_NAMES[currentMonth] + ', ' + currentYear;
      calGrid.innerHTML = '';

      var firstDay  = new Date(currentYear, currentMonth, 1);
      var lastDay   = new Date(currentYear, currentMonth + 1, 0);
      var startDow  = (firstDay.getDay() + 6) % 7;
      var today     = new Date();
      today.setHours(0,0,0,0);

      var prevMonth = new Date(currentYear, currentMonth, 0);
      for (var i = startDow - 1; i >= 0; i--) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'appt-cal__day appt-cal__day--other';
        btn.innerHTML = '<span class="appt-cal__day-num">' + (prevMonth.getDate() - i) + '</span>';
        btn.disabled = true;
        calGrid.appendChild(btn);
      }

      for (var d = 1; d <= lastDay.getDate(); d++) {
        var date = new Date(currentYear, currentMonth, d);
        date.setHours(0,0,0,0);
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'appt-cal__day';
        var schedule = getDoctorSchedule(date);
        var isPast = date < today;

        if (isPast) {
          btn.classList.add('appt-cal__day--disabled');
          btn.innerHTML = '<span class="appt-cal__day-num">' + d + '</span>';
          btn.disabled = true;
        } else if (!schedule) {
          btn.classList.add('appt-cal__day--off');
          btn.innerHTML = '<span class="appt-cal__day-num">' + d + '</span><span class="appt-cal__day-sub">Не работает</span>';
          btn.disabled = true;
        } else {
          var subText = schedule.start + '–' + schedule.end;
          btn.innerHTML = '<span class="appt-cal__day-num">' + d + '</span><span class="appt-cal__day-sub">' + subText + '</span>';

          if (date.getTime() === today.getTime()) {
            btn.classList.add('appt-cal__day--today');
          }

          if (selectedDate && date.getTime() === selectedDate.getTime()) {
            btn.classList.add('appt-cal__day--selected');
          }

          (function(dateRef) {
            btn.addEventListener('click', function () {
              selectedDate = dateRef;
              selectedTimeSlot = null;
              renderCalendar();
              renderTimeSlots();
            });
          })(date);
        }

        calGrid.appendChild(btn);
      }

      var totalCells = startDow + lastDay.getDate();
      var remainder  = totalCells % 7;
      if (remainder > 0) {
        for (var n = 1; n <= 7 - remainder; n++) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'appt-cal__day appt-cal__day--other';
          btn.innerHTML = '<span class="appt-cal__day-num">' + n + '</span>';
          btn.disabled = true;
          calGrid.appendChild(btn);
        }
      }
    }

    // --- Time Slots ---
    var timeGrid = document.getElementById('timeGrid');

    function renderTimeSlots() {
      timeGrid.innerHTML = '';
      if (!selectedDate) {
        timeGrid.innerHTML = '<p class="appt-time__placeholder">Сначала выберите дату</p>';
        return;
      }

      var schedule = getDoctorSchedule(selectedDate);
      if (!schedule) {
        timeGrid.innerHTML = '<p class="appt-time__placeholder">Врач не работает в этот день</p>';
        return;
      }

      var now = new Date();
      var isToday = selectedDate.toDateString() === now.toDateString();

      for (var h = schedule.start; h < schedule.end; h++) {
        for (var m = 0; m < 60; m += 30) {
          if (h === schedule.end - 1 && m === 30) continue;
          var startH = String(h).padStart(2, '0');
          var startM = String(m).padStart(2, '0');
          var endMinTotal = h * 60 + m + 30;
          var endH = String(Math.floor(endMinTotal / 60)).padStart(2, '0');
          var endM = String(endMinTotal % 60).padStart(2, '0');
          var label = 'С ' + startH + ':' + startM + ' до ' + endH + ':' + endM;
          var slotValue = startH + ':' + startM;

          if (isToday) {
            var slotTime = h * 60 + m;
            var currentTime = now.getHours() * 60 + now.getMinutes();
            if (slotTime <= currentTime) continue;
          }

          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'appt-time__slot';
          btn.textContent = label;
          btn.dataset.time = slotValue;

          if (selectedTimeSlot === slotValue) {
            btn.classList.add('appt-time__slot--selected');
          }

          (function(sv, lbl) {
            btn.addEventListener('click', function () {
              selectedTimeSlot = sv;

              var dtText = document.getElementById('datetimePickerText');
              var dateStr = selectedDate.getDate() + ' ' +
                MONTH_NAMES[selectedDate.getMonth()].toLowerCase() + ' ' +
                selectedDate.getFullYear() + ', ' + lbl.toLowerCase();
              dtText.textContent = dateStr;
              dtText.classList.add('is-filled');

              showStep(stepForm);
            });
          })(slotValue, label);

          timeGrid.appendChild(btn);
        }
      }

      if (!timeGrid.children.length) {
        timeGrid.innerHTML = '<p class="appt-time__placeholder">Нет доступных слотов на этот день</p>';
      }
    }

    // --- Form validation & submit ---
    function showErr(input, msg) {
      input.classList.add('is-error');
      var err = input.closest('.form__field').querySelector('.form__err');
      if (err) err.textContent = msg;
    }
    function clearErr(input) {
      input.classList.remove('is-error');
      var err = input.closest('.form__field').querySelector('.form__err');
      if (err) err.textContent = '';
    }

    form.querySelectorAll('.form__input').forEach(function(inp) {
      inp.addEventListener('blur', function() { validateField(inp); });
      inp.addEventListener('input', function() { if (inp.classList.contains('is-error')) validateField(inp); });
    });

    function validateField(inp) {
      var v = inp.value.trim();
      if (inp.name === 'name') {
        if (!v) { showErr(inp, 'Введите ваше имя'); return false; }
        if (v.length < 2) { showErr(inp, 'Минимум 2 символа'); return false; }
      }
      if (inp.name === 'phone') {
        var digits = v.replace(/\D/g, '');
        if (!v) { showErr(inp, 'Введите номер телефона'); return false; }
        if (digits.length < 11) { showErr(inp, 'Неверный формат телефона'); return false; }
      }
      clearErr(inp);
      return true;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInp  = document.getElementById('fName');
      var phoneInp = document.getElementById('fPhone');

      var nameOk  = validateField(nameInp);
      var phoneOk = validateField(phoneInp);

      if (!nameOk || !phoneOk) return;

      var data = {
        name:    nameInp.value.trim(),
        phone:   phoneInp.value.trim(),
        doctor:  selectedDoctor ? selectedDoctor.name : '',
        date:    selectedDate ? selectedDate.toLocaleDateString('ru-RU') : '',
        time:    selectedTimeSlot || '',
        comment: document.getElementById('fComment').value.trim(),
      };

      console.log('Form submitted:', data);

      showStep(stepSuccess);
      spawnParticles();
    });

    function spawnParticles() {
      var container = document.getElementById('successParticles');
      container.innerHTML = '';
      var colors = ['#C9A96E', '#D4BA8A', '#22C55E', '#16a34a', '#1A1A3E', '#E5DFD8'];
      for (var i = 0; i < 30; i++) {
        var p = document.createElement('span');
        p.className = 'appt-success__particle';
        var angle = Math.random() * Math.PI * 2;
        var dist = 60 + Math.random() * 120;
        p.style.setProperty('--px', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--py', Math.sin(angle) * dist + 'px');
        p.style.left = '50%';
        p.style.top = '25%';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = (4 + Math.random() * 6) + 'px';
        p.style.height = p.style.width;
        p.style.animationDelay = (Math.random() * 0.4) + 's';
        p.style.animationDuration = (1.2 + Math.random() * 0.8) + 's';
        container.appendChild(p);
      }
    }

    // --- Success screen: back to main ---
    var successBtn = document.getElementById('successBackBtn');
    successBtn.addEventListener('click', function () {
      form.reset();
      selectedDoctor = null;
      selectedDate = null;
      selectedTimeSlot = null;
      doctorPickerText.textContent = 'Выберите врача';
      doctorPickerText.classList.remove('is-filled');
      var dtText = document.getElementById('datetimePickerText');
      dtText.textContent = 'Выберите желаемый день и время приема';
      dtText.classList.remove('is-filled');
      datetimePicker.classList.add('form__picker--disabled');
      closeDoctorDropdown();
      doctorDropdown.querySelectorAll('.doc-option').forEach(function(o) {
        o.classList.remove('is-selected');
      });

      showStep(stepForm);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

  })();

  // -------------------------------------------------------------------------
  // 10. Advantages — accordion + stat panel sync
  // -------------------------------------------------------------------------
  (function initAdvAccordion() {
    const items  = document.querySelectorAll('.adv-item');
    const slides = document.querySelectorAll('.adv-panel__slide');
    if (!items.length) return;

    items.forEach((item, i) => {
      item.querySelector('.adv-item__trigger').addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all
        items.forEach(el => {
          el.classList.remove('is-open');
          el.querySelector('.adv-item__trigger').setAttribute('aria-expanded', 'false');
        });
        slides.forEach(el => el.classList.remove('is-active'));

        // Toggle open (click on already-open item closes it; a fresh item opens)
        if (!isOpen) {
          item.classList.add('is-open');
          item.querySelector('.adv-item__trigger').setAttribute('aria-expanded', 'true');
          if (slides[i]) slides[i].classList.add('is-active');
        }
      });
    });
  })();

  // -------------------------------------------------------------------------
  // 11. Consultation modal
  // -------------------------------------------------------------------------
  (function initConsultModal() {
    var overlay = document.getElementById('consultOverlay');
    var modal   = document.getElementById('consultModal');
    var openBtn = document.getElementById('openConsultModal');
    var closeBtn = document.getElementById('consultClose');
    var form    = document.getElementById('consultForm');
    var success = document.getElementById('consultSuccess');
    var successClose = document.getElementById('consultSuccessClose');
    if (!overlay || !openBtn) return;

    var cPhoneInput = document.getElementById('cPhone');
    if (cPhoneInput) {
      cPhoneInput.addEventListener('input', function () {
        var val = this.value.replace(/\D/g, '');
        if (val.startsWith('8')) val = '7' + val.slice(1);
        if (!val.startsWith('7')) val = '7' + val;
        val = val.slice(0, 11);
        var formatted = '+7';
        if (val.length > 1) formatted += ' (' + val.slice(1, 4);
        if (val.length >= 4) formatted += ') ' + val.slice(4, 7);
        if (val.length >= 7) formatted += '-' + val.slice(7, 9);
        if (val.length >= 9) formatted += '-' + val.slice(9, 11);
        this.value = formatted;
      });
      cPhoneInput.addEventListener('focus', function () {
        if (!this.value) this.value = '+7 ';
      });
      cPhoneInput.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && this.value === '+7') e.preventDefault();
      });
    }

    function openModal() {
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      overlay.hidden = true;
      document.body.style.overflow = '';
      form.hidden = false;
      success.hidden = true;
      form.reset();
      form.querySelectorAll('.is-error').forEach(function(el) { el.classList.remove('is-error'); });
      form.querySelectorAll('.form__err').forEach(function(el) { el.textContent = ''; });
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    successClose.addEventListener('click', closeModal);

    var openMobileNav = document.getElementById('openConsultMobileNav');
    if (openMobileNav) {
      openMobileNav.addEventListener('click', function () {
        burger.classList.remove('is-open');
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        document.body.style.overflow = '';
        setTimeout(openModal, 150);
      });
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) closeModal();
    });

    function showErr(input, msg) {
      input.classList.add('is-error');
      var err = input.closest('.form__field').querySelector('.form__err');
      if (err) err.textContent = msg;
    }
    function clearErr(input) {
      input.classList.remove('is-error');
      var err = input.closest('.form__field').querySelector('.form__err');
      if (err) err.textContent = '';
    }

    form.querySelectorAll('.form__input').forEach(function(inp) {
      inp.addEventListener('blur', function() { validateField(inp); });
      inp.addEventListener('input', function() { if (inp.classList.contains('is-error')) validateField(inp); });
    });

    function validateField(inp) {
      var v = inp.value.trim();
      if (inp.name === 'name') {
        if (!v) { showErr(inp, 'Введите ваше имя'); return false; }
        if (v.length < 2) { showErr(inp, 'Минимум 2 символа'); return false; }
      }
      if (inp.name === 'phone') {
        var digits = v.replace(/\D/g, '');
        if (!v) { showErr(inp, 'Введите номер телефона'); return false; }
        if (digits.length < 11) { showErr(inp, 'Неверный формат телефона'); return false; }
      }
      clearErr(inp);
      return true;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInp = document.getElementById('cName');
      var phoneInp = document.getElementById('cPhone');
      var nameOk = validateField(nameInp);
      var phoneOk = validateField(phoneInp);
      if (!nameOk || !phoneOk) return;

      var data = {
        type: 'consultation',
        name: nameInp.value.trim(),
        phone: phoneInp.value.trim(),
        comment: document.getElementById('cComment').value.trim(),
      };
      console.log('Consultation submitted:', data);

      form.hidden = true;
      success.hidden = false;
    });
  })();

  // -------------------------------------------------------------------------
  // 12. Mobile sticky CTA — show after hero, hide near appointment section
  // -------------------------------------------------------------------------
  const mobileCta   = document.getElementById('mobileCta');
  const heroEl      = document.getElementById('hero');
  const appointmentEl = document.getElementById('appointment');

  if (mobileCta && heroEl) {
    function updateMobileCta() {
      if (window.innerWidth >= 1024) { mobileCta.hidden = true; return; }
      const heroBottom  = heroEl.getBoundingClientRect().bottom;
      const apptTop     = appointmentEl ? appointmentEl.getBoundingClientRect().top : Infinity;
      const viewH       = window.innerHeight;
      const showAboveHero = heroBottom < 0;
      const hideNearAppt  = apptTop < viewH * 0.85;
      mobileCta.hidden = !(showAboveHero && !hideNearAppt);
    }
    window.addEventListener('scroll', updateMobileCta, { passive: true });
    window.addEventListener('resize', updateMobileCta, { passive: true });
    updateMobileCta();

    // Pin CTA to visual viewport bottom (fixes iOS Chrome "floating" bug
    // when the browser chrome collapses/expands on scroll)
    const vv = window.visualViewport;
    if (vv) {
      let rafId = null;
      function syncCtaToVisualViewport() {
        const layoutHeight = document.documentElement.clientHeight;
        const visualBottom = vv.offsetTop + vv.height;
        const delta = visualBottom - layoutHeight;
        mobileCta.style.transform = delta ? `translateY(${delta}px)` : '';
      }
      function schedule() {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          rafId = null;
          syncCtaToVisualViewport();
        });
      }
      vv.addEventListener('resize', schedule);
      vv.addEventListener('scroll', schedule);
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('orientationchange', schedule);
      syncCtaToVisualViewport();
    }
  }

})();
