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
Customer phone ──scan QR──▶ frontend /menu/:idTable ──▶ backend /api/menu/**   (public)
Staff browser  ──login────▶ frontend back office    ──▶ backend /api/**        (JWT)
                                                           │
                                                         MySQL
```

## Quick start with Docker

```bash
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:9090/api/ |
| phpMyAdmin | http://localhost:8081 |
| MySQL | localhost:3306 (user `root`, empty password) |

The backend creates the schema and an initial admin account on first start. To load the sample data instead, import `database/pfe_restoqr.sql` into the `pfe_restoQR` database through phpMyAdmin.

## Run without Docker

1. Start MySQL on port 3306.
2. Backend: `cd backend` then `./mvnw spring-boot:run`
3. Frontend: `cd frontend`, `npm install`, then `ng serve`

## History

The backend and frontend were first developed in two separate repositories, `RestoQR-Backend` and `RestoQR-Frontend`. They were merged here with their full commit history.
