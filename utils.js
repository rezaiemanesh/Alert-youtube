function isInSchedule(start, end) {
  const h = new Date().getHours();
  return start <= end ? (h >= start && h < end) : (h >= start || h < end);
}

async function checkLiveStatus(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    return text.includes("LIVE NOW") || text.includes("is live now");
  } catch (e) {
    return false;
  }
}

