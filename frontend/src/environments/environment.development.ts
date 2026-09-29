// Development (ng serve): the backend runs separately on port 9090.
const backUrl = 'http://localhost:9090/';
const frontUrl = `${window.location.origin}/`;

export const environment = {
    apiUrl: `${backUrl}api/`,
    qrCodeUrl: `${frontUrl}login/`,
    qrCodeTableUrl: `${frontUrl}menu/`
};
