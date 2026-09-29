# syntax=docker/dockerfile:1

# Build the jar
FROM eclipse-temurin:11-jdk-alpine AS build
WORKDIR /build

# Download dependencies first so they are cached between builds
COPY --chmod=0755 mvnw ./
COPY .mvn/ .mvn/
COPY pom.xml ./
RUN --mount=type=cache,target=/root/.m2 ./mvnw -q dependency:go-offline

COPY src/ src/
RUN --mount=type=cache,target=/root/.m2 ./mvnw -q package -DskipTests \
    && cp target/*.jar app.jar \
    && java -Djarmode=layertools -jar app.jar extract --destination extracted

# Run with a JRE only, as a non-root user
FROM eclipse-temurin:11-jre-alpine
RUN addgroup -S app && adduser -S app -G app
USER app
WORKDIR /app

# Spring Boot layers, from least to most frequently changed
COPY --from=build /build/extracted/dependencies/ ./
COPY --from=build /build/extracted/spring-boot-loader/ ./
COPY --from=build /build/extracted/snapshot-dependencies/ ./
COPY --from=build /build/extracted/application/ ./

EXPOSE 9090
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "org.springframework.boot.loader.JarLauncher"]
