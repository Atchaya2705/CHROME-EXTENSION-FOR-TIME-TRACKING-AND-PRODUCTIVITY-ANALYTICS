let currentTabId = null;
let currentDomain = null;
let startTime = Date.now();

const productiveSites = ["github.com", "stackoverflow.com", "leetcode.com"];
const unproductiveSites = ["facebook.com", "instagram.com", "youtube.com"];

function getDomain(url) {
    try {
        return new URL(url).hostname.replace("www.", "");
    } catch {
        return null;
    }
}

async function updateTime() {
    if (!currentDomain) return;
    const duration = Date.now() - startTime;

    chrome.storage.local.get([currentDomain], (data) => {
        const prev = data[currentDomain] || 0;
        chrome.storage.local.set({ [currentDomain]: prev + duration });
    });

    fetch("http://localhost:3000/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            domain: currentDomain,
            time: duration,
            category: productiveSites.includes(currentDomain)
                ? "productive"
                : unproductiveSites.includes(currentDomain)
                ? "unproductive"
                : "neutral"
        })
    });

    startTime = Date.now();
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    await updateTime();
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        currentDomain = getDomain(tab.url);
        currentTabId = activeInfo.tabId;
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "complete") {
        updateTime();
        currentDomain = getDomain(tab.url);
        currentTabId = tabId;
    }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        updateTime();
        currentDomain = null;
    }
});
