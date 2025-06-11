document.getElementById("addChannelBtn").addEventListener("click", () => {
  const rawInput = document.getElementById("channelInput").value.trim();
  const url = rawInput.startsWith("http") ? rawInput : `https://www.youtube.com/${rawInput}`;

  chrome.storage.local.get({ channels: [] }, ({ channels }) => {
    if (!channels.includes(url)) {
      channels.push(url);
      chrome.storage.local.set({ channels });
      renderChannels(channels);
    }
  });
});

function renderChannels(channels) {
  const ul = document.getElementById("channelList");
  ul.innerHTML = "";
  channels.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    ul.appendChild(li);
  });
}

chrome.storage.local.get({ channels: [] }, ({ channels }) => renderChannels(channels));

document.getElementById("saveTime").addEventListener("click", () => {
  const start = parseInt(document.getElementById("startHour").value);
  const end = parseInt(document.getElementById("endHour").value);
  chrome.storage.local.set({ startHour: start, endHour: end });
});

document.getElementById("testNotification").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "test_notify" });
});
