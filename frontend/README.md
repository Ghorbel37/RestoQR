# RestoQR-Frontend

Angular web app for **RestoQR**: a QR-code menu for customers and a back office for staff.

Each table has its own QR code. Customers scan it to open the menu for that table, fill a cart and place an order. Staff log in to manage the menu, accounts, tables and QR codes.

The API lives in [RestoQR-Backend](https://github.com/Ghorbel37/RestoQR-Backend).

## Tech stack

- Angular 15, Angular Material
- `angularx-qrcode` to generate QR codes, `print-js` to print them
- JWT authentication (`jwt-decode`, HTTP interceptor, route guards)
- Docker

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

- Node.js 18 (the Docker image uses Node 20)
- Angular CLI 15 (`npm install -g @angular/cli@15`)
- The backend running on port 9090

### Configuration

URLs are set in `src/environments/environment.development.ts`:

| Setting | Default | Used for |
|---|---|---|
| `apiUrl` | `http://localhost:9090/api/` | Backend API |
| `qrCodeTableUrl` | `http://localhost:4200/menu/` | Link encoded in each table's QR code |
| `qrCodeUrl` | `http://localhost:4200/login/` | Link encoded in the staff login QR code |

To scan the QR codes with a phone, replace `localhost` with your computer's local IP address (for example `http://192.168.1.10:4200/`) and start the dev server with `--host 0.0.0.0`.

### Run locally

```bash
npm install
ng serve
```

Then open `http://localhost:4200/`.

### Run with Docker

```bash
docker compose up --build
```

This builds the image from the `Dockerfile` and serves the app on port 4200. See [README.Docker.md](README.Docker.md) for more.

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
