document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("donationForm");
  const emailInput = form.email;
  const otherRadio = form.querySelector('input[value="other"]');
  const otherAmountInput = form.other_amount;
  const recurringCheckbox = form.recurring;
  const recurringFields = document.getElementById("recurringFields");
  const monthlyAmountInput = form.monthly_amount;
  const monthsInput = form.months;
  const totalDisplay = document.getElementById("recurringTotal");
  const honorRadios = form.querySelectorAll('input[name="honor_type"]');
  const acknowledgeFields = document.getElementById("acknowledgeFields");
  const comments = form.comments;

  // Hide initially
  otherAmountInput.style.display = "none";
  recurringFields.style.display = "none";
  acknowledgeFields.style.display = "none";

  // 1️⃣ Required Field Validation + 2️⃣ Email Format Validation
  form.addEventListener("submit", function(e) {
    const required = [form.first_name, form.last_name, form.email];
    for (let field of required) {
      if (!field.value.trim()) {
        alert("Please fill out all required fields.");
        e.preventDefault();
        return;
      }
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      alert("Please enter a valid email address.");
      e.preventDefault();
      return;
    }

    // Donation Amount Required
    const donationSelected = form.querySelector('input[name="amount"]:checked');
    if (!donationSelected) {
      alert("Please select a donation amount.");
      e.preventDefault();
      return;
    }

    // Recurring total display
    if (recurringCheckbox.checked) {
      const m = parseFloat(monthlyAmountInput.value) || 0;
      const n = parseInt(monthsInput.value) || 0;
      if (m && n) alert("Your total recurring donation: $" + (m * n));
    }
  });

  // 3️⃣ Show/Hide "Other Amount"
  form.querySelectorAll('input[name="amount"]').forEach(radio => {
    radio.addEventListener("change", function() {
      if (otherRadio.checked) {
        otherAmountInput.style.display = "inline-block";
      } else {
        otherAmountInput.style.display = "none";
        otherAmountInput.value = "";
      }
    });
  });

  // 4️⃣ Show/Hide Recurring Fields
  recurringCheckbox.addEventListener("change", function() {
    recurringFields.style.display = recurringCheckbox.checked ? "block" : "none";
  });

  // 8️⃣ Show/Hide Acknowledge Fields
  honorRadios.forEach(r => {
    r.addEventListener("change", function() {
      acknowledgeFields.style.display = (r.checked) ? "block" : "none";
    });
  });

  // 9️⃣ Comment Character Limit
  const maxChars = 200;
  comments.addEventListener("input", function() {
    if (comments.value.length > maxChars) {
      alert("Comments limited to 200 characters.");
      comments.value = comments.value.substring(0, maxChars);
    }
  });

  // 🔟 Live Recurring Total Calculation
  function updateTotal() {
    const m = parseFloat(monthlyAmountInput.value) || 0;
    const n = parseInt(monthsInput.value) || 0;
    if (m && n) {
      totalDisplay.textContent = "Total Donation: $" + (m * n);
    } else {
      totalDisplay.textContent = "";
    }
  }
  monthlyAmountInput.addEventListener("input", updateTotal);
  monthsInput.addEventListener("input", updateTotal);

  // 7️⃣ Reset Confirmation
  form.querySelector('input[type="reset"]').addEventListener("click", function(e) {
    if (!confirm("Are you sure you want to reset the form?")) e.preventDefault();
  });
});
