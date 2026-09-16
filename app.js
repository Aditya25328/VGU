/**
 * VGU Digicampus Frontend Portal
 * 
 * Configured with authentic student profiles for MBA HR (Session 2026):
 * 1. Aaryan Singh (53777)
 * 2. Ram Narayan Jat (53805)
 * 3. Sumit Kumar (53783)
 */

// ============================================================
// 1. VERIFIED STUDENT RECORDS FOR MBA HR
// ============================================================
const STUDENTS_DATABASE = [
  {
    id: "53777",
    name: "AARYAN SINGH",
    rollNumber: "26TEC2MB377",
    applicationNo: "VGU_2026_18_577745",
    email: "aaryansingh2705@gmail.com",
    department: "MBA IN HUMAN RESOURCE MANAGEMENT",
    headline: "MBA HR Student @ Vivekananda Global University",
    avatarUrl: "assets/aaryan_avatar.jpg",
    avatarLetter: "A",
    phone: "9064669190",
    classSchedule: {
      today: {
        subject: "Strategic Human Resource Management [MBAHR201]",
        time: "1:00 PM - 1:50 PM",
        type: "Lecture & Case Study",
        faculty: "Dr. Sharma",
        venue: "ACB-304",
        subVenue: "Management Block"
      },
      tomorrow: {
        subject: "Organizational Behaviour & Talent Acquisition [MBAHR202]",
        time: "10:00 AM - 10:55 AM",
        venue: "ACB-302 Management Block"
      }
    }
  },
  {
    id: "53805",
    name: "RAM NARAYAN JAT",
    rollNumber: "26TEC2MB380",
    applicationNo: "VGU_2026_18_577747",
    email: "ramnarayanjat6384@gmail.com",
    department: "MBA IN HUMAN RESOURCE MANAGEMENT",
    headline: "MBA HR Student @ Vivekananda Global University",
    avatarUrl: "assets/ram_avatar.jpg",
    avatarLetter: "R",
    phone: "8690414661",
    classSchedule: {
      today: {
        subject: "Talent Acquisition & Retention Strategies [MBAHR203]",
        time: "11:00 AM - 11:55 AM",
        type: "Lecture & Case Study",
        faculty: "Dr. Verma",
        venue: "ACB-305",
        subVenue: "Management Block"
      },
      tomorrow: {
        subject: "Performance Management Systems [MBAHR204]",
        time: "12:00 PM - 12:55 PM",
        venue: "ACB-301 Management Block"
      }
    }
  },
  {
    id: "53783",
    name: "SUMIT KUMAR",
    rollNumber: "26TEC2MB383",
    applicationNo: "VGU_2026_18_577749",
    email: "jsu49448@gmail.com",
    department: "MBA IN HUMAN RESOURCE MANAGEMENT",
    headline: "MBA HR Student @ Vivekananda Global University",
    avatarUrl: "assets/sumit_avatar.jpg",
    avatarLetter: "S",
    phone: "8284327162",
    classSchedule: {
      today: {
        subject: "Industrial Relations & Labour Legislation [MBAHR205]",
        time: "2:00 PM - 2:50 PM",
        type: "Lecture & Case Study",
        faculty: "Prof. Gupta",
        venue: "ACB-304",
        subVenue: "Management Block"
      },
      tomorrow: {
        subject: "Compensation & Benefits Management [MBAHR206]",
        time: "10:00 AM - 10:55 AM",
        venue: "ACB-303 Management Block"
      }
    }
  }
];

// Currently active selected student index (0 = Aaryan Singh)
let currentStudentIndex = 0;

// ============================================================
// 2. INITIALIZATION
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderGoogleAccountsList();
  loadStudentProfile(currentStudentIndex);
  setupInteractiveHandlers();
});

/**
 * Render the Google Chooser account list dynamically with all 3 students
 */
function renderGoogleAccountsList() {
  const container = document.getElementById("google-accounts-list");
  if (!container) return;

  container.innerHTML = "";

  STUDENTS_DATABASE.forEach((student, index) => {
    const item = document.createElement("button");
    item.className = "google-account-item";
    item.onclick = () => selectAndLogin(index);

    item.innerHTML = `
      <div class="account-avatar-circle">
        <img src="${student.avatarUrl}" alt="${student.name}" onerror="this.outerHTML='<span class=\"avatar-letter\">${student.avatarLetter}</span>'">
      </div>
      <div class="account-info-text">
        <div class="account-name-id">${student.name} ${student.id}</div>
        <div class="account-email">${student.email}</div>
      </div>
    `;

    container.appendChild(item);
  });

  // Use another account option
  const another = document.createElement("button");
  another.className = "google-account-item use-another-account";
  another.id = "btn-use-another";
  another.onclick = () => {
    const googleModal = document.getElementById("google-modal-overlay");
    if (googleModal) googleModal.classList.remove("active");
  };
  another.innerHTML = `
    <div class="account-avatar-icon">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </div>
    <div class="account-info-text">
      <div class="account-name-id another-text">Use another account</div>
    </div>
  `;
  container.appendChild(another);
}

/**
 * Populate all UI fields with the selected student's data
 */
function loadStudentProfile(index) {
  currentStudentIndex = index;
  const student = STUDENTS_DATABASE[index];
  if (!student) return;

  // Sidebar Profile Card
  const pName = document.getElementById("profile-name");
  const pId = document.getElementById("profile-id");
  const pRoll = document.getElementById("profile-roll");
  const pDept = document.getElementById("profile-dept");
  const sAvatar = document.getElementById("sidebar-avatar");
  const hAvatar = document.getElementById("header-avatar");
  const dName = document.getElementById("dropdown-user-name");
  const dEmail = document.getElementById("dropdown-user-email");
  const loginInput = document.getElementById("login-user-input");

  if (pName) pName.textContent = student.name;
  if (pId) pId.textContent = student.id;
  if (pRoll) pRoll.textContent = student.rollNumber;
  if (pDept) pDept.textContent = student.department;
  if (sAvatar) sAvatar.src = student.avatarUrl;
  if (hAvatar) hAvatar.src = student.avatarUrl;
  if (dName) dName.textContent = student.name;
  if (dEmail) dEmail.textContent = student.email;
  if (loginInput) loginInput.value = student.email;

  // Update classes
  const classSub = document.getElementById("class-subject");
  if (classSub) {
    classSub.textContent = student.classSchedule.today.subject;
  }
}

/**
 * Select a student from Google modal and trigger login
 */
function selectAndLogin(index) {
  loadStudentProfile(index);
  triggerLoginFlow();
}

/**
 * Switch student live inside the dashboard
 */
function switchStudent(index) {
  loadStudentProfile(index);
  const userPopup = document.getElementById("user-dropdown-popup");
  if (userPopup) userPopup.classList.remove("open");
  
  // Show brief confirmation toast
  const toast = document.getElementById("success-toast");
  const toastMsg = toast.querySelector(".toast-message");
  if (toastMsg) toastMsg.textContent = `Switched to ${STUDENTS_DATABASE[index].name}`;
  if (toast) {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      if (toastMsg) toastMsg.textContent = "Sign in successful";
    }, 3000);
  }
}

/**
 * Setup event listeners and UI interactivity
 */
function setupInteractiveHandlers() {
  // Password visibility toggle
  const pwToggle = document.getElementById("password-toggle-btn");
  const pwInput = document.getElementById("login-password-input");
  if (pwToggle && pwInput) {
    pwToggle.addEventListener("click", () => {
      if (pwInput.type === "password") {
        pwInput.type = "text";
        pwToggle.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        `;
      } else {
        pwInput.type = "password";
        pwToggle.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
      }
    });
  }

  // Toast close button
  const toastCloseBtn = document.getElementById("toast-close-btn");
  if (toastCloseBtn) {
    toastCloseBtn.addEventListener("click", () => {
      const toast = document.getElementById("success-toast");
      if (toast) toast.classList.remove("show");
    });
  }

  // Header user menu dropdown toggle
  const headerUserMenu = document.getElementById("header-user-menu");
  const userPopup = document.getElementById("user-dropdown-popup");
  if (headerUserMenu && userPopup) {
    headerUserMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      userPopup.classList.toggle("open");
    });

    document.addEventListener("click", () => {
      userPopup.classList.remove("open");
    });
  }

  // Sidebar Nav Item Highlight
  const navItems = document.querySelectorAll(".nav-item:not(.nav-logout-item)");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Quick Action Tabs (Post / Ask Question / Add Event)
  const actionTabs = document.querySelectorAll(".quick-action-tab");
  actionTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      actionTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // Headline edit action
  const addHeadlineBtn = document.getElementById("add-headline-btn");
  if (addHeadlineBtn) {
    addHeadlineBtn.addEventListener("click", () => {
      const currentHeadline = STUDENTS_DATABASE[currentStudentIndex].headline || "MBA HR Student @ VGU";
      const newHeadline = prompt("Enter your headline:", currentHeadline);
      if (newHeadline !== null && newHeadline.trim() !== "") {
        STUDENTS_DATABASE[currentStudentIndex].headline = newHeadline;
        addHeadlineBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          ${newHeadline}
        `;
      }
    });
  }
}

/**
 * Triggers the login transition sequence matching the reference video:
 * Google Dialog -> Spinner Overlay ("One moment please...") -> Sign in successful Toast -> Main Dashboard
 */
function triggerLoginFlow() {
  const googleModal = document.getElementById("google-modal-overlay");
  const loadingOverlay = document.getElementById("loading-overlay");
  const toast = document.getElementById("success-toast");
  const loginScreen = document.getElementById("login-screen");
  const dashboardScreen = document.getElementById("dashboard-screen");

  // 1. Hide Google Modal
  if (googleModal) googleModal.classList.remove("active");

  // 2. Show loading spinner
  if (loadingOverlay) loadingOverlay.classList.add("active");

  setTimeout(() => {
    // 3. Hide loading spinner
    if (loadingOverlay) loadingOverlay.classList.remove("active");

    // 4. Switch from login screen to dashboard
    if (loginScreen) loginScreen.style.display = "none";
    if (dashboardScreen) dashboardScreen.style.display = "flex";

    // 5. Trigger Success Toast
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 4500);
    }
  }, 850);
}

/**
 * Traditional login form handler
 */
function handleTraditionalLogin(e) {
  e.preventDefault();
  triggerLoginFlow();
}

/**
 * Open Google Picker Modal
 */
function triggerGooglePicker() {
  const googleModal = document.getElementById("google-modal-overlay");
  if (googleModal) googleModal.classList.add("active");
}

/**
 * Complete Logout Handler (Takes back to login screen with Google modal)
 */
function handleLogout() {
  const dashboardScreen = document.getElementById("dashboard-screen");
  const loginScreen = document.getElementById("login-screen");
  const googleModal = document.getElementById("google-modal-overlay");
  const userPopup = document.getElementById("user-dropdown-popup");

  if (userPopup) userPopup.classList.remove("open");
  if (dashboardScreen) dashboardScreen.style.display = "none";
  if (loginScreen) loginScreen.style.display = "flex";
  if (googleModal) googleModal.classList.add("active");
}

/**
 * Email verification button handler
 */
function handleVerifyEmail() {
  const student = STUDENTS_DATABASE[currentStudentIndex];
  const btn = document.getElementById("btn-verify-email");
  if (btn) {
    btn.textContent = "Sending OTP...";
    btn.disabled = true;
    setTimeout(() => {
      const otp = prompt(`Verification OTP sent to ${student.email}\nEnter 6-digit OTP:`, "582914");
      if (otp) {
        btn.textContent = "Verified ✓";
        btn.style.borderColor = "#22c55e";
        btn.style.color = "#22c55e";
        alert("Email verified successfully!");
      } else {
        btn.textContent = "Verify";
        btn.disabled = false;
      }
    }, 600);
  }
}
