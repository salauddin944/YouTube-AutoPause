async function pauseVideo(tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    function: () => {
      const video = document.querySelector('video');
      if (video && !video.paused) {
        video.pause();
      }
    }
  });
}

async function resumeVideo(tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    function: () => {
      const video = document.querySelector('video');
      if (video && video.paused) {
        video.play();
      }
    }
  });
}

chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    const tabs = await chrome.tabs.query({ url: "*://www.youtube.com/watch*" });
    for (const tab of tabs) {
      pauseVideo(tab.id);
    }
  } else {
    const tabs = await chrome.tabs.query({ active: true, windowId });
    if (tabs.length > 0 && tabs[0].url.includes("youtube.com/watch")) {
      resumeVideo(tabs[0].id);
    }
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url.includes("youtube.com/watch")) {
      resumeVideo(tab.id);
    }
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.active && tab.url.includes("youtube.com/watch")) {
    resumeVideo(tabId);
  }
});
