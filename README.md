# RestoQR

Restaurant ordering by QR code: a menu for customers and a back office for staff.

Each table in the restaurant has its own QR code. Customers scan it with their phone to open the menu for that table, fill a cart and place an order, then follow its status. Staff log in to a back office to manage the menu, tables, orders, accounts and the restaurant profile, and to print the table QR codes.

Built in 2023 as a PFE (end-of-studies) project.

## Repository structure

| Folder | Description | Stack |
|---|---|---|
| [`backend/`](backend/) | REST API with JWT authentication | Java 11, Spring Boot 2.6, Spring Security, JPA, MySQL |
| [`frontend/`](frontend/) | Customer menu and staff back office | Angular 15, Angular Material |
| [`database/`](database/) | MySQL dump with sample data (restaurant, categories, articles with images) | MySQL |

Each app has its own README with details: [backend](backend/README.md), [frontend](frontend/README.md).

## How it works

```
Customer phone ──scan QR──▶ nginx: /menu/:idTable ──▶ /api/menu/** → backend  (public)
Staff browser  ──login────▶ nginx: back office    ──▶ /api/**      → backend  (JWT)
                                                                        │
                                                                      MySQL
```

## Quick start with Docker

```bash
docker compose up --build
```

This runs production builds: the Angular app is compiled and served by nginx, which also forwards `/api/` to the Spring Boot backend.

| Service | URL |
|---|---|
| App (nginx) | http://localhost:4200 |
| Backend API (direct) | http://localhost:9090/api/ |
| phpMyAdmin | http://localhost:8081 |
| MySQL | localhost:3306 (user `root`, empty password) |

The backend creates the schema and an admin account (`admin@admin.com` / `admin`) on first start. To load the sample data instead, import `database/pfe_restoqr.sql` into the `pfe_restoQR` database through phpMyAdmin.

Because the app uses relative URLs, it also works from other devices on your network: open `http://<your-pc-ip>:4200` and the generated QR codes point to that address too.

## Run without Docker

1. Start MySQL on port 3306.
2. Backend: `cd backend` then `./mvnw spring-boot:run`
3. Frontend: `cd frontend`, `npm install`, then `ng serve`
