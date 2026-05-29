export const track = async (event, data = {}) => {
  try {
    await fetch("/api/track", {
      method: "POST",
      body: JSON.stringify({
        event,
        data,
        time: Date.now()
      })
    });
  } catch (err) {
    console.error(err);
  }
};
