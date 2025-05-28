document.getElementById("kolejForm").addEventListener("submit", function (e) {
  e.preventDefault();

  document
    .querySelectorAll(".error-message")
    .forEach((span) => (span.textContent = ""));
  document
    .querySelectorAll("input, select, textarea")
    .forEach((input) => input.classList.remove("error"));

  const nama = document.getElementById("nama");
  const matrik = document.getElementById("matrik");
  const kursus = document.getElementById("kursus");
  const bahagian = document.getElementById("bahagian");
  const agama = document.getElementById("agama");
  const telefon = document.getElementById("telefon");
  const alamat = document.getElementById("alamat");
  const tarikhMasuk = document.getElementById("tarikhMasuk");
  const tarikhKeluar = document.getElementById("tarikhKeluar");
  const foto = document.getElementById("foto");

  const nameRegex = /^[A-Za-z\s]+$/;
  const numberRegex = /^[0-9]+$/;

  let valid = true;
  let bulan = 0;

  // Validate Nama
  if (!nameRegex.test(nama.value.trim())) {
    setError(nama, "Name can only contain letter and space.");
    valid = false;
  }

  // Validate Matrik (Student Number)
  const matrikValue = matrik.value.trim();
  const matrikRegex = /^202[0-5]\d{6}$/;

  if (!matrikRegex.test(matrikValue)) {
    setError(
      matrik,
      "Matric Number must be 10-digit and start with 2023 to 2025."
    );
    valid = false;
  }

  // Validate Bahagian (Semester)
  const bahagianValue = bahagian.value.trim();

  if (
    !numberRegex.test(bahagianValue) ||
    parseInt(bahagianValue) < 1 ||
    parseInt(bahagianValue) >= 11
  ) {
    setError(bahagian, "Semester must be within 1-10.");
    valid = false;
  }

  // Validate Telefon
  const phoneValue = telefon.value.trim();
  const phoneRegex = /^01\d{8,9}$/;

  if (!phoneRegex.test(phoneValue)) {
    setError(
      telefon,
      "Only a valid phone number without symbol (ex: 0123456789) are allowed and must start with 01."
    );
    valid = false;
  }

  // Validate Kursus (Course/Program)
  let kursusValue = kursus.value.trim().toUpperCase();
  kursus.value = kursusValue;

  const kursusRegex = /^[A-Z][A-Z0-9\-\/]{3,5}[0-9]$/;

  if (!kursusRegex.test(kursusValue)) {
    setError(
      kursus,
      "Course must start with a letter & end with a number and must be 5-7 characters long."
    );
    valid = false;
  }

  // Validate Foto
  if (!foto.files[0] || !foto.files[0].type.startsWith("image/")) {
    setError(foto, "Only image file is allowed (ex: .jpg, .png).");
    valid = false;
  }

  // Validate Tarikh Masuk & Keluar
  const masukDate = new Date(tarikhMasuk.value);
  const keluarDate = new Date(tarikhKeluar.value);

  if (isNaN(masukDate) || isNaN(keluarDate) || keluarDate <= masukDate) {
    setError(tarikhKeluar, "Exit date must after entrance date.");
    valid = false;
  } else {
    const masukYear = masukDate.getFullYear();
    const masukMonth = masukDate.getMonth();
    const keluarYear = keluarDate.getFullYear();
    const keluarMonth = keluarDate.getMonth();

    const totalMonths =
      (keluarYear - masukYear) * 12 + (keluarMonth - masukMonth);
    bulan = totalMonths;

    if (totalMonths < 5 || totalMonths > 6) {
      setError(
        tarikhKeluar,
        "The period of stay must be between 5 to 6 months."
      );
      valid = false;
    }
  }

  if (!valid) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    const gambarBase64 = event.target.result;

    const formData = {
      nama: nama.value.trim(),
      matrik: matrik.value.trim(),
      kursus: kursus.value.trim(),
      bahagian: bahagian.value.trim(),
      agama: agama.value,
      telefon: telefon.value.trim(),
      alamat: alamat.value.trim(),
      tarikhMasuk: tarikhMasuk.value,
      tarikhKeluar: tarikhKeluar.value,
      bulan,
      gambarBase64,
    };

    localStorage.setItem("formData", JSON.stringify(formData));
    window.location.href = "success.html";
  };

  reader.onerror = function () {
    alert("Failed to read image file. Please try again.");
  };

  reader.readAsDataURL(foto.files[0]);
});

function setError(element, message) {
  element.classList.add("error");
  const errorSpan = element.parentElement.querySelector(".error-message");
  if (errorSpan) {
    errorSpan.textContent = message;
  }
}