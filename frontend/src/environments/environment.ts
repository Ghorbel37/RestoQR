// Production: the app is served by nginx, which forwards /api/ to the backend,
// so every URL is relative to the host the app was opened from.
const frontUrl = `${window.location.origin}/`;

export const environment = {
    apiUrl: '/api/',
    qrCodeUrl: `${frontUrl}login/`,
    qrCodeTableUrl: `${frontUrl}menu/`
};
