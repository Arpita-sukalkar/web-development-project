# ==============================================================================
# Multi-Stage Dockerfile for CarePulse HMS Backend Directory
# Base Image: Eclipse Temurin 17 (JRE & JDK)
# ==============================================================================

# Stage 1: Build the application JAR skipping unit tests
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /workspace

# Download dependencies in an isolated cache layer
COPY pom.xml .
RUN mvn dependency:go-offline -B || true

# Copy backend source code and build package
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Production-hardened non-root runtime container
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Create unprivileged user and group for security
RUN groupadd -r appgroup && useradd -r -u 1001 -g appgroup -s /bin/false appuser

# Copy executable jar from builder stage
COPY --from=builder /workspace/target/*.jar app.jar
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Render injects PORT dynamically at runtime (defaults to 8080)
ENV PORT=8080
ENV SPRING_PROFILES_ACTIVE=postgres
EXPOSE ${PORT}

# Fast startup flags with non-blocking entropy
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
