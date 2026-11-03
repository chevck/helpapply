const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function uploadCv(file, experience, { signal } = {}) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("experience", experience);

  const response = await fetch(`${API_BASE_URL}/cv/upload`, {
    method: "POST",
    body: formData,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }

  return response.json().catch(() => null);
}
