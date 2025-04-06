chrome.storage.local.get(null, (items) => {
  const container = document.getElementById("data");
  const sorted = Object.entries(items).sort((a, b) => b[1] - a[1]);

  sorted.forEach(([domain, time]) => {
    const mins = (time / 60000).toFixed(2);
    container.innerHTML += `<p><strong>${domain}</strong>: ${mins} mins</p>`;
  });
});
