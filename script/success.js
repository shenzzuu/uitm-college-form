document.addEventListener("DOMContentLoaded", () => {
  const successSection = document.getElementById("successMessage");
  const formData = JSON.parse(localStorage.getItem("formData"));

  successSection.innerHTML = `
    <br><br>
    <h2>UiTM College Application Form</h2>
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${formData.gambarBase64}" alt="Student's Photo" style="max-width: 150px; max-height: 150px; border-radius: 10px;" />
    </div>
    <p>Your application is being processed. Please print the form for office use.</p>
    <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse; text-align: left;">
      <tr>
        <th>Name</th>
        <td>${formData.nama}</td>
      </tr>
      <tr>
        <th>Matric No.</th>
        <td>${formData.matrik}</td>
      </tr>
      <tr>
        <th>Program / Course</th>
        <td>${formData.kursus}</td>
      </tr>
      <tr>
        <th>Phone Number</th>
        <td>${formData.telefon}</td>
      </tr>
      <tr>
        <th>Address</th>
        <td>${formData.alamat}</td>
      </tr>
      <tr>
        <th>Period of Stay</th>
        <td>${formData.bulan} Months</td>
      </tr>
    </table>
  `;

  const printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
});