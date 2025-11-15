document.addEventListener('DOMContentLoaded', () => {
  const enableBtn = document.getElementById('enableBtn');
  const disableBtn = document.getElementById('disableBtn');

  function updateUI(enabled) {
    enableBtn.disabled = enabled;
    disableBtn.disabled = !enabled;
  }

  chrome.storage.local.get(['enabled'], (result) => {
    updateUI(result.enabled === true);
  });

  enableBtn.addEventListener('click', () => {
    chrome.storage.local.set({ enabled: true }, () => {
      updateUI(true);
    });
  });

  disableBtn.addEventListener('click', () => {
    chrome.storage.local.set({ enabled: false }, () => {
      updateUI(false);
    });
  });
});
