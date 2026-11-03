const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function uploadCv(file, experience, { signal } = {}) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("experience", experience);

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/cv/upload`, {
      method: "POST",
      body: formData,
      signal,
    });
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
        : "We couldn't verify your CV. Please try again.",
    );
  }

  return response.json().catch(() => null);
}
