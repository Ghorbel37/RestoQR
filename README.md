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

## Docker

Both setups run production builds: the Angular app is compiled and served by nginx, which also forwards `/api/` to the Spring Boot backend. They use separate database volumes, so demo data never mixes with production data.

| File | Use | Data | Exposed ports |
|---|---|---|---|
| `docker-compose.yml` | Demo, local testing | Sample data | App, API, MySQL, phpMyAdmin |
| `docker-compose.prod.yml` | Production | Empty database | App only |

### Demo with sample data

```bash
docker compose up --build
```

| Service | URL |
|---|---|
| App (nginx) | http://localhost:4200 |
| Backend API (direct) | http://localhost:9090/api/ |
| phpMyAdmin | http://localhost:8081 |
| MySQL | localhost:3306 (user `root`, empty password) |

On first start, MySQL loads the sample data from `database/pfe_restoqr.sql`: the restaurant "Chef food", 20 tables, 4 categories, 11 articles with images and a few orders. You can log in with `admin@admin.com` / `admin` (admin) or `user@user.com` / `admin` (user).

The dump only runs when the database volume is empty. To reset to the sample data, run `docker compose down -v` then `docker compose up`.

Because the app uses relative URLs, it also works from other devices on your network: open `http://<your-pc-ip>:4200` and the generated QR codes point to that address too.

### Production

1. Copy `.env.example` to `.env` and set strong values for `MYSQL_ROOT_PASSWORD` and `MYSQL_PASSWORD`. Optionally change `APP_PORT` (default 80).
2. Start the stack:

   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

3. Open `http://<server>:<APP_PORT>` and log in with `admin@admin.com` / `admin`, then change that password right away.

MySQL and the backend are only reachable inside the Docker network, and the backend connects with a dedicated `restoqr` database user instead of `root`. The JWT signing key is still hardcoded in the backend (see the [backend README](backend/README.md#security-notes)).

## Run without Docker

1. Start MySQL on port 3306.
2. Backend: `cd backend` then `./mvnw spring-boot:run`
3. Frontend: `cd frontend`, `npm install`, then `ng serve`
