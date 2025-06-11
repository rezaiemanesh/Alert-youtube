importScripts("utils.js");

chrome.alarms.create("checkLive", { periodInMinutes: 2 });

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.local.get(["channels", "startHour", "endHour", "lastLive"], ({ channels, startHour = 0, endHour = 24, lastLive = {} }) => {
    if (!isInSchedule(startHour, endHour)) return;

    channels.forEach(async (url) => {
      const isLive = await checkLiveStatus(url);
      if (isLive && lastLive[url] !== true) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png",
          title: "🔴 Live Now!",
          message: `Channel is live now!\n${url}`,
        });
        lastLive[url] = true;
      } else if (!isLive) {
        lastLive[url] = false;
      }
    });
    chrome.storage.local.set({ lastLive });
  });
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "test_notify") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Test Notification",
      message: "This is a test. Notifications are working."
    });
  }
});
