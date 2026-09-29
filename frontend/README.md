# RestoQR-Frontend

Angular web app for **RestoQR**: a QR-code menu for customers and a back office for staff.

Each table has its own QR code. Customers scan it to open the menu for that table, fill a cart and place an order. Staff log in to manage the menu, accounts, tables and QR codes.

Part of the [RestoQR](../README.md) monorepo. The API is in [`backend/`](../backend/).

## Tech stack

- Angular 15, Angular Material
- `angularx-qrcode` to generate QR codes, `print-js` to print them
- JWT authentication (`jwt-decode`, HTTP interceptor, route guards)
- nginx and Docker for production

## Features

### Customer menu (no login)

| Route | Page |
|---|---|
| `/menu/:idTable` | Menu for a table, opened by scanning its QR code |
| `/panier/:idTable` | Cart and order confirmation |
| `/commande/:idCommande` | Order details and status |

### Staff back office (login required)

| Route | Page |
|---|---|
| `/login` | Staff login |
| `/profile` | Restaurant profile (name, address, phone, Wi-Fi, logo, number of tables) |
| `/categories` | Menu categories |
| `/articles` | Menu items with images and prices |
| `/users` | Staff accounts, roles and passwords |
| `/codes` | QR codes for every table, ready to print |

The interface is in French.

## Getting started

### Requirements

- Node.js 18
- Angular CLI 15 (`npm install -g @angular/cli@15`)
- The backend running on port 9090

### Configuration

| File | Used by | API URL |
|---|---|---|
| `src/environments/environment.development.ts` | `ng serve` | `http://localhost:9090/api/` |
| `src/environments/environment.ts` | `ng build` (production) | `/api/`, forwarded to the backend by nginx |

In both, the QR codes link to the address the app was opened from (`window.location.origin`), so they work on another device as long as you open the app through your computer's IP address.

### Run locally (development)

```bash
npm install
ng serve
```

Then open `http://localhost:4200/`. To test from a phone, run `ng serve --host 0.0.0.0` and open `http://<your-pc-ip>:4200/`.

### Production build

```bash
ng build
```

The output goes to `dist/angular-restaurant-qr-code/`. The `Dockerfile` builds it and serves it with nginx (see `nginx.conf`), which also forwards `/api/` to the backend. Run the whole stack with `docker compose up --build` from the repository root.

## Project structure

```
src/app/
├── pages/
│   ├── menu-client/   Customer menu, cart and order modal
│   ├── commande/      Order details
│   ├── login/         Staff login
│   ├── profile/       Restaurant profile
│   ├── categories/    Category management
│   ├── articles/      Menu item management
│   ├── comptes/       Staff accounts
│   ├── qr-codes/      Table QR codes
│   └── _common/       Shared dialogs
├── services/          API services
├── guards/            Route guards
├── interceptors/      JWT interceptor
├── validators/        Form validators
├── model/             TypeScript models
└── custom-material/   Angular Material module
```
