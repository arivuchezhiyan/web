/**
 * SIMPLE.JS — Web Technologies Exam Reference Script
 * Demonstrates:
 * 1. All DOM Selectors (getElementById, querySelector, querySelectorAll, etc.)
 * 2. Event Handling (submit, click, input)
 * 3. Form Validation (name, email regex, dropdown, checkbox)
 * 4. DOM Manipulation (createElement, appendChild, removeChild, classList.toggle)
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("simple.js loaded successfully - Exam Demonstration Ready");

    // ==========================================================================
    // TOPIC 1: DOM SELECTORS (Standard Exam Question)
    // ==========================================================================
    // 1.1 getElementById: Fastest, targets by exact ID
    const form = document.getElementById("student-form");
    const nameInput = document.getElementById("student-name");
    const emailInput = document.getElementById("student-email");
    const deptSelect = document.getElementById("student-dept");
    const termsCheck = document.getElementById("terms-check");
    const successBanner = document.getElementById("form-success-banner");

    // 1.2 querySelector: Uses CSS selector syntax, returns first matching element
    const nameError = document.querySelector("#name-error");
    const emailError = document.querySelector("#email-error");
    const deptError = document.querySelector("#dept-error");
    const termsError = document.querySelector("#terms-error");

    // 1.3 querySelectorAll: Returns a static NodeList of all matching elements
    const allSectionTitles = document.querySelectorAll(".section-title");
    console.log("Total section titles found via querySelectorAll:", allSectionTitles.length);

    // ==========================================================================
    // TOPIC 2: FORM VALIDATION LOGIC (Very Frequent Exam Question)
    // ==========================================================================
    
    // Regular expression for standard email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time input clearing
    nameInput.addEventListener("input", function () {
        if (nameInput.value.trim().length >= 3) {
            nameError.textContent = "";
            nameInput.style.borderColor = "#38a169"; // Green border
        }
    });

    emailInput.addEventListener("input", function () {
        if (emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = "";
            emailInput.style.borderColor = "#38a169";
        }
    });

    deptSelect.addEventListener("change", function () {
        if (deptSelect.value !== "") {
            deptError.textContent = "";
            deptSelect.style.borderColor = "#38a169";
        }
    });

    termsCheck.addEventListener("change", function () {
        if (termsCheck.checked) {
            termsError.textContent = "";
        }
    });

    // Form submit validation handler
    form.addEventListener("submit", function (event) {
        // Prevent default browser form submission (refreshing page)
        event.preventDefault();

        let isValid = true;

        // Reset error messages and banners
        nameError.textContent = "";
        emailError.textContent = "";
        deptError.textContent = "";
        termsError.textContent = "";
        successBanner.style.display = "none";

        // Validate Name (Required, min 3 chars)
        const nameVal = nameInput.value.trim();
        if (nameVal === "") {
            nameError.textContent = "Error: Name cannot be empty.";
            nameInput.style.borderColor = "#e53e3e";
            isValid = false;
        } else if (nameVal.length < 3) {
            nameError.textContent = "Error: Name must be at least 3 characters long.";
            nameInput.style.borderColor = "#e53e3e";
            isValid = false;
        } else {
            nameInput.style.borderColor = "#38a169";
        }

        // Validate Email (Required, regex match)
        const emailVal = emailInput.value.trim();
        if (emailVal === "") {
            emailError.textContent = "Error: Email is required.";
            emailInput.style.borderColor = "#e53e3e";
            isValid = false;
        } else if (!emailRegex.test(emailVal)) {
            emailError.textContent = "Error: Enter a valid email format (e.g., user@domain.com).";
            emailInput.style.borderColor = "#e53e3e";
            isValid = false;
        } else {
            emailInput.style.borderColor = "#38a169";
        }

        // Validate Department dropdown
        if (deptSelect.value === "") {
            deptError.textContent = "Error: Please select a department from the dropdown.";
            deptSelect.style.borderColor = "#e53e3e";
            isValid = false;
        } else {
            deptSelect.style.borderColor = "#38a169";
        }

        // Validate Terms Checkbox
        if (!termsCheck.checked) {
            termsError.textContent = "Error: You must accept the exam guidelines.";
            isValid = false;
        }

        // If all validations pass
        if (isValid) {
            successBanner.style.display = "block";
            successBanner.textContent = `✔ Form Validated Successfully! Registered: ${nameVal} (${deptSelect.value})`;

            // Automatically add submitted student to the dynamic list below
            addNewItem(`${nameVal} - ${deptSelect.value}`);

            // Reset form fields
            form.reset();
            nameInput.style.borderColor = "#cbd5e0";
            emailInput.style.borderColor = "#cbd5e0";
            deptSelect.style.borderColor = "#cbd5e0";
        }
    });

    // ==========================================================================
    // TOPIC 3: DYNAMIC DOM OPERATIONS (Exam Favorite)
    // createElement, appendChild, removeChild, classList.toggle
    // ==========================================================================
    const dynamicList = document.getElementById("dynamic-list");
    const countEl = document.getElementById("dom-count");
    const btnAdd = document.getElementById("btn-add-item");
    const btnRemove = document.getElementById("btn-remove-item");
    const btnToggleColor = document.getElementById("btn-toggle-color");

    let itemCounter = 2; // Starts with 2 default items

    function updateCount() {
        const totalItems = dynamicList.getElementsByTagName("li").length;
        countEl.textContent = totalItems;
    }

    function addNewItem(customText) {
        itemCounter++;
        // 1. createElement: create a new DOM element node
        const newLi = document.createElement("li");

        // 2. Set content
        newLi.textContent = customText || `Dynamic List Item ${itemCounter}`;

        // 3. appendChild: append to parent container
        dynamicList.appendChild(newLi);

        updateCount();
    }

    // Add item click handler
    btnAdd.addEventListener("click", function () {
        addNewItem();
    });

    // Remove last item click handler
    btnRemove.addEventListener("click", function () {
        // Check if there are children to remove
        if (dynamicList.lastElementChild) {
            // removeChild: remove child from DOM
            dynamicList.removeChild(dynamicList.lastElementChild);
            updateCount();
        } else {
            alert("No more items to remove!");
        }
    });

    // Toggle highlight class using classList.toggle
    btnToggleColor.addEventListener("click", function () {
        const items = dynamicList.getElementsByTagName("li");
        for (let i = 0; i < items.length; i++) {
            // classList.toggle adds class if absent, removes if present
            items[i].classList.toggle("highlight-row");
        }
    });
});
