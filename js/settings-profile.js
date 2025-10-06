// UI-only prototype: in-memory state, no persistence.

const state = {
  phones: [
    // Seed examples or set to [] to start empty
    { id: crypto.randomUUID(), type: "mobile", number: "(555) 123-4567" },
  ],
  emails: [{ id: crypto.randomUUID(), address: "jane@example.com" }],
  editingPhoneId: null, // "__new__" for add form
  editingEmailId: null, // "__new__" for add form
};

const $ = (sel, root = document) => root.querySelector(sel);

// Status helpers
const phoneStatus = document.getElementById("phone-status");
const emailStatus = document.getElementById("email-status");

function showStatus(el, message = "Saved.", durationMs = 1600) {
  if (!el) return;
  el.textContent = message;
  el.style.display = "";
  if (el._hideTimer) clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => {
    el.style.display = "none";
  }, durationMs);
}

// ===== PHONE =====
const phoneSection = $("#phone-section");
const phoneList = $("#phone-list");
const phoneEmpty = $("#phone-empty");
const tplPhoneRow = $("#tpl-phone-row");
const tplPhoneForm = $("#tpl-phone-form");

function renderPhones() {
  phoneList.innerHTML = "";

  if (!state.phones.length) {
    phoneEmpty.style.display = state.editingPhoneId === "__new__" ? "none" : "";
  } else {
    phoneEmpty.style.display = "none";
  }

  // Render rows / edit forms for existing
  state.phones.forEach((p) => {
    if (state.editingPhoneId === p.id) {
      const node = tplPhoneForm.content.cloneNode(true);
      const form = $("[data-kind='phone-form']", node);
      form.dataset.id = p.id;
      form.type.value = p.type;
      form.number.value = p.number;
      phoneList.appendChild(node);
    } else {
      const node = tplPhoneRow.content.cloneNode(true);
      const row = $("[data-kind='phone']", node);
      row.dataset.id = p.id;
      $("[data-field='type-label']", row).textContent = labelForType(p.type);
      $("[data-field='number']", row).textContent = p.number;
      phoneList.appendChild(node);
    }
  });

  // Render blank add form if adding new
  if (state.editingPhoneId === "__new__") {
    const node = tplPhoneForm.content.cloneNode(true);
    const form = $("[data-kind='phone-form']", node);
    form.dataset.id = "__new__";
    phoneList.appendChild(node);
  }

  // "+ Add another" when not editing and list has at least one item
  if (state.editingPhoneId === null && state.phones.length) {
    const addAnother = document.createElement("p");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn--link";
    btn.dataset.action = "add-phone";
    btn.textContent = "+ Add another";
    addAnother.appendChild(btn);
    phoneList.appendChild(addAnother);
  }
}

function labelForType(v) {
  switch (v) {
    case "mobile":
      return "Mobile";
    case "home":
      return "Home";
    case "business":
      return "Business";
    default:
      return v || "";
  }
}

function openAddPhone() {
  if (state.editingPhoneId !== null) return; // one editor at a time
  state.editingPhoneId = "__new__";
  renderPhones();
}

function savePhone(form) {
  // Clear previous validation state
  setInvalid(form, "type", false);
  setInvalid(form, "number", false);

  const id = form.dataset.id;
  const type = (form.type.value || "").trim();
  const raw = (form.number.value || "").trim();
  const number = formatPhone(raw);

  let invalid = false;
  if (!type) {
    setInvalid(form, "type", true);
    invalid = true;
  }
  if (!isValidUSPhone(number)) {
    setInvalid(form, "number", true);
    invalid = true;
  }
  if (invalid) return;

  if (id === "__new__") {
    state.phones.push({ id: crypto.randomUUID(), type, number });
  } else {
    const idx = state.phones.findIndex((p) => p.id === id);
    if (idx > -1) state.phones[idx] = { ...state.phones[idx], type, number };
  }

  state.editingPhoneId = null;
  renderPhones();
  showStatus(phoneStatus, "Saved.");
}

function cancelPhone() {
  state.editingPhoneId = null;
  renderPhones();
}

function removePhone(id) {
  if (!confirm("Remove this phone number?")) return;
  state.phones = state.phones.filter((p) => p.id !== id);
  state.editingPhoneId = null;
  renderPhones();
}

function isValidUSPhone(formatted) {
  const digits = (formatted || "").replace(/\D/g, "");
  return digits.length === 10;
}

function formatPhone(v) {
  const digits = (v || "").replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// Event delegation (phone)
phoneSection.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const { action } = btn.dataset;

  if (action === "add-phone") openAddPhone();

  if (action === "edit-phone") {
    if (state.editingPhoneId !== null) return;
    const row = btn.closest("[data-kind='phone']");
    state.editingPhoneId = row?.dataset.id || null;
    renderPhones();
  }

  if (action === "remove-phone") {
    const row = btn.closest("[data-kind='phone']");
    removePhone(row?.dataset.id);
  }

  if (action === "cancel-phone") {
    cancelPhone();
  }
});

phoneSection.addEventListener("submit", (e) => {
  const form = e.target.closest("[data-kind='phone-form']");
  if (!form) return;
  e.preventDefault();
  savePhone(form);
});

// ===== EMAIL =====
const emailSection = $("#email-section");
const emailList = $("#email-list");
const emailEmpty = $("#email-empty");
const tplEmailRow = $("#tpl-email-row");
const tplEmailForm = $("#tpl-email-form");

function renderEmails() {
  emailList.innerHTML = "";

  if (!state.emails.length) {
    emailEmpty.style.display = state.editingEmailId === "__new__" ? "none" : "";
  } else {
    emailEmpty.style.display = "none";
  }

  state.emails.forEach((m) => {
    if (state.editingEmailId === m.id) {
      const node = tplEmailForm.content.cloneNode(true);
      const form = $("[data-kind='email-form']", node);
      form.dataset.id = m.id;
      form.address.value = m.address;
      emailList.appendChild(node);
    } else {
      const node = tplEmailRow.content.cloneNode(true);
      const row = $("[data-kind='email']", node);
      row.dataset.id = m.id;
      $("[data-field='address']", row).textContent = m.address;
      emailList.appendChild(node);
    }
  });

  if (state.editingEmailId === "__new__") {
    const node = tplEmailForm.content.cloneNode(true);
    const form = $("[data-kind='email-form']", node);
    form.dataset.id = "__new__";
    emailList.appendChild(node);
  }

  if (state.editingEmailId === null && state.emails.length) {
    const addAnother = document.createElement("p");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn--link";
    btn.dataset.action = "add-email";
    btn.textContent = "+ Add another";
    addAnother.appendChild(btn);
    emailList.appendChild(addAnother);
  }
}

function openAddEmail() {
  if (state.editingEmailId !== null) return;
  state.editingEmailId = "__new__";
  renderEmails();
}

function saveEmail(form) {
  // Clear previous validation state
  setInvalid(form, "address", false);

  const id = form.dataset.id;
  const address = (form.address.value || "").trim();

  let invalid = false;
  if (!isValidEmail(address)) {
    setInvalid(form, "address", true);
    invalid = true;
  }
  if (invalid) return;

  if (id === "__new__") {
    state.emails.push({ id: crypto.randomUUID(), address });
  } else {
    const idx = state.emails.findIndex((m) => m.id === id);
    if (idx > -1) state.emails[idx] = { ...state.emails[idx], address };
  }

  state.editingEmailId = null;
  renderEmails();
  showStatus(emailStatus, "Saved.");
}

function cancelEmail() {
  state.editingEmailId = null;
  renderEmails();
}

function removeEmail(id) {
  if (!confirm("Remove this email address?")) return;
  state.emails = state.emails.filter((m) => m.id !== id);
  state.editingEmailId = null;
  renderEmails();
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
}

// Toggle .is-invalid on a specific field's .form-group
function setInvalid(form, name, isInvalid) {
  const wrap = form.querySelector(`[data-fieldwrap="${name}"]`);
  if (!wrap) return;
  wrap.classList.toggle("is-invalid", !!isInvalid);
}

// Event delegation (email)
emailSection.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const { action } = btn.dataset;

  if (action === "add-email") openAddEmail();

  if (action === "edit-email") {
    if (state.editingEmailId !== null) return;
    const row = btn.closest("[data-kind='email']");
    state.editingEmailId = row?.dataset.id || null;
    renderEmails();
  }

  if (action === "remove-email") {
    const row = btn.closest("[data-kind='email']");
    removeEmail(row?.dataset.id);
  }

  if (action === "cancel-email") {
    cancelEmail();
  }
});

emailSection.addEventListener("submit", (e) => {
  const form = e.target.closest("[data-kind='email-form']");
  if (!form) return;
  e.preventDefault();
  saveEmail(form);
});

// Initial render
renderPhones();
renderEmails();
