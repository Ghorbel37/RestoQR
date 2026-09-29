# RestoQR-Backend

Spring Boot REST API for **RestoQR**, a restaurant ordering app based on QR codes. Each table has its own QR code: customers scan it to open the menu, fill a cart and place an order, while staff manage the menu, tables, orders and accounts from a back office.

Part of the [RestoQR](../README.md) monorepo. The web app is in [`frontend/`](../frontend/).

## Tech stack

- Java 11, Spring Boot 2.6
- Spring Data JPA (Hibernate) with MySQL
- Spring Security with stateless JWT authentication (jjwt)
- MapStruct and Lombok for DTO mapping
- Maven (wrapper included), Docker

## Features

- **Public menu API** (`/api/menu/**`, no login): restaurant info, categories, articles, table lookup, placing an order and following it by table or by ID
- **Authentication** (`/api/auth/**`): login returns a JWT, which is then sent as `Authorization: Bearer <token>`
- **Back office API** (`/api/**`, login required): CRUD for articles, categories, tables (including bulk creation), orders, order lines, invoices, clients, employees, users and the restaurant profile
- **Roles**: `ADMIN`, `USER`, `PERSONEL`
- **Order states**: `En_cours`, `valide`, `annule`
- **Ratings** on articles
- **First-run seeding** (`DatabaseInitializer`): creates the restaurant, a walk-in client ("Passager"), table 1 and an admin account when the tables are empty

## Project structure

```
src/main/java/com/pfe/restaurant/
├── config/       Security config, UserDetails, DatabaseInitializer
├── filter/       JwtAuthFilter
├── controller/   REST controllers (/api/...)
├── service/      Business logic, JwtService
├── repository/   Spring Data repositories
├── model/        JPA entities
├── dto/          DTOs
└── mapper/       MapStruct mappers
```

## Getting started

### Requirements

- JDK 11
- MySQL 5.7+ (or the Docker setup below)

### Configuration

Settings are in `src/main/resources/application.properties`:

| Property | Default |
|---|---|
| `server.port` | `9090` |
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/pfe_restoQR` (the database is created if missing) |
| `spring.datasource.username` / `password` | `root` / empty |

Hibernate runs with `ddl-auto=update`, so the schema is created on first start.

### Run locally

```bash
./mvnw spring-boot:run
```

The API is then available at `http://localhost:9090/api/`.

### Run with Docker

From the repository root:

```bash
docker compose up --build
```

The `Dockerfile` builds the jar with Maven, then runs it on a small Alpine JRE image as a non-root user. Compose starts MySQL first and passes the database settings through `SPRING_DATASOURCE_*` environment variables.

## Security notes

This is a student project (PFE, 2023) and isn't production-ready:

- The JWT signing key is hardcoded in `JwtService.java`
- The seeded admin account (`admin@admin.com` / `admin`) is set in `DatabaseInitializer.java`
- The database uses `root` with an empty password

Move these to environment variables and change the admin password before deploying anywhere.
