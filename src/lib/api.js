const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, init, fallbackMessage) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, init);
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new Error(
      "We couldn't reach the server. Check your connection and try again.",
      { cause: err },
    );
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      typeof body?.message === "string" && body.message.trim()
        ? body.message
        : fallbackMessage,
    );
  }

  return response.json().catch(() => null);
}

export function uploadCv(file, experience, { signal } = {}) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("experience", experience);

  return request(
    "/cv/upload",
    { method: "POST", body: formData, signal },
    "We couldn't verify your CV. Please try again.",
  );
}

export function upgradeCv({ text, level, improvements }, { signal } = {}) {
  return request(
    "/cv/upgrade",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, level, report: { improvements } }),
      signal,
    },
    "We couldn't update your CV. Please try again.",
  );
}
