const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, init, fallbackMessage) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { credentials: "include", ...init });
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

function jsonRequest(path, method, body, fallbackMessage) {
  return request(
    path,
    {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    fallbackMessage,
  );
}

export function getMe({ signal } = {}) {
  return request("/auth/me", { signal }, "We couldn't check your session.");
}

export function signUp({ name, email, password }) {
  return jsonRequest(
    "/auth/signup",
    "POST",
    { name, email, password },
    "We couldn't create your account. Please try again.",
  );
}

export function logIn({ email, password }) {
  return jsonRequest(
    "/auth/login",
    "POST",
    { email, password },
    "We couldn't log you in. Please try again.",
  );
}

export function logOut() {
  return request("/auth/logout", { method: "POST" }, "We couldn't log you out.");
}

export function oauthStartUrl(provider, returnTo) {
  return `${API_BASE_URL}/auth/${provider}?returnTo=${encodeURIComponent(returnTo)}`;
}

export function saveCv({ title, level, content }) {
  return jsonRequest(
    "/cvs",
    "POST",
    { title, level, content },
    "We couldn't save your CV. Please try again.",
  );
}

export function listSavedCvs({ signal } = {}) {
  return request("/cvs", { signal }, "We couldn't load your saved CVs.");
}

export function getSavedCv(id, { signal } = {}) {
  return request(`/cvs/${id}`, { signal }, "We couldn't load that CV.");
}

export function deleteSavedCv(id) {
  return request(
    `/cvs/${id}`,
    { method: "DELETE" },
    "We couldn't delete that CV. Please try again.",
  );
}
