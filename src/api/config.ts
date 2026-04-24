export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const getImageUrl = (path: string | string[]) => {
  if (!path) return "/placeholder.png";

  const imagePath = Array.isArray(path) ? path[0] : path;

  if (imagePath?.startsWith("http")) {
    return imagePath;
  }

  // Prepend backend URL for local uploads
  // If API_BASE_URL is http://localhost:5000/api, we need http://localhost:5000
  const serverUrl = API_BASE_URL?.replace("/api", "");
  return `${serverUrl}${imagePath?.startsWith("/") ? "" : "/"}${imagePath}`;
};


// export const getImageUrl = (url?: string) => {
//   if (!url) return "";

//   const base = import.meta.env.VITE_IMAGE_URL;

//   // already full URL (production safe)
//   if (url.startsWith("http")) {
//     return url;
//   }

//   // if backend returns /uploads/...
//   if (url.startsWith("/uploads")) {
//     return `${base}/api${url}`;
//   }

//   // if backend returns api/uploads directly
//   if (url.startsWith("/api/uploads")) {
//     return `${base}${url}`;
//   }

//   // fallback (just in case)
//   return `${base}/api/uploads/${url}`;
// };