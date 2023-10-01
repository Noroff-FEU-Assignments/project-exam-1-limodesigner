export function updateCopyrightYear() {
    const d = new Date();
    const year = d.getFullYear();
    document.getElementById("currentYear").textContent = year;
  }