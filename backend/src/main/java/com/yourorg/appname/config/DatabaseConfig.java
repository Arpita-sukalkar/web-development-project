package com.yourorg.appname.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * Smart Database Configuration for PostgreSQL deployments (specifically tuned for Render.com).
 * Automatically detects and parses the DATABASE_URL environment variable injected by Render
 * (e.g. postgres://user:password@hostname:5432/dbname) and converts it into standard JDBC format.
 */
@Configuration
@Profile("postgres")
public class DatabaseConfig {

    private static final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);

    @Value("${DATABASE_URL:#{null}}")
    private String databaseUrlProperty;

    @Value("${spring.datasource.url:#{null}}")
    private String fallbackDatasourceUrl;

    @Value("${spring.datasource.username:#{null}}")
    private String fallbackUsername;

    @Value("${spring.datasource.password:#{null}}")
    private String fallbackPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setDriverClassName("org.postgresql.Driver");

        // Priority 1: System environment variable DATABASE_URL (injected by Render)
        String rawDatabaseUrl = System.getenv("DATABASE_URL");
        if (rawDatabaseUrl == null || rawDatabaseUrl.isBlank()) {
            rawDatabaseUrl = databaseUrlProperty;
        }

        if (rawDatabaseUrl != null && !rawDatabaseUrl.isBlank()) {
            String trimmedUrl = rawDatabaseUrl.trim();
            log.info("Configuring PostgreSQL datasource from DATABASE_URL...");

            if (trimmedUrl.startsWith("postgres://") || trimmedUrl.startsWith("postgresql://")) {
                try {
                    // Standardize scheme to postgres:// for URI parsing if needed
                    String uriString = trimmedUrl.startsWith("postgresql://") 
                            ? "postgres://" + trimmedUrl.substring("postgresql://".length()) 
                            : trimmedUrl;
                    
                    URI uri = new URI(uriString);
                    String userInfo = uri.getUserInfo();
                    String username = "";
                    String password = "";

                    if (userInfo != null && userInfo.contains(":")) {
                        String[] parts = userInfo.split(":", 2);
                        username = parts[0];
                        password = parts[1];
                    } else if (userInfo != null) {
                        username = userInfo;
                    }

                    String host = uri.getHost();
                    int port = (uri.getPort() == -1) ? 5432 : uri.getPort();
                    String path = uri.getPath(); // includes leading '/'
                    if (path == null || path.isBlank() || path.equals("/")) {
                        path = "/hospital_db";
                    }

                    StringBuilder jdbcUrl = new StringBuilder("jdbc:postgresql://")
                            .append(host)
                            .append(":")
                            .append(port)
                            .append(path);

                    if (uri.getQuery() != null && !uri.getQuery().isBlank()) {
                        jdbcUrl.append("?").append(uri.getQuery());
                    }

                    hikariConfig.setJdbcUrl(jdbcUrl.toString());
                    hikariConfig.setUsername(username);
                    hikariConfig.setPassword(password);

                    log.info("Successfully converted DATABASE_URL to JDBC format: jdbc:postgresql://{}:{}{}", host, port, path);
                } catch (URISyntaxException e) {
                    log.error("Failed to parse DATABASE_URL URI: {}", trimmedUrl, e);
                    String directJdbc = trimmedUrl.startsWith("jdbc:") ? trimmedUrl : "jdbc:" + trimmedUrl;
                    hikariConfig.setJdbcUrl(directJdbc);
                }
            } else if (trimmedUrl.startsWith("jdbc:")) {
                hikariConfig.setJdbcUrl(trimmedUrl);
                if (fallbackUsername != null) hikariConfig.setUsername(fallbackUsername);
                if (fallbackPassword != null) hikariConfig.setPassword(fallbackPassword);
            } else {
                hikariConfig.setJdbcUrl("jdbc:postgresql://" + trimmedUrl);
                if (fallbackUsername != null) hikariConfig.setUsername(fallbackUsername);
                if (fallbackPassword != null) hikariConfig.setPassword(fallbackPassword);
            }
        } else {
            log.info("No DATABASE_URL found. Falling back to spring.datasource properties.");
            String jdbcUrl = (fallbackDatasourceUrl != null && !fallbackDatasourceUrl.isBlank())
                    ? fallbackDatasourceUrl
                    : "jdbc:postgresql://localhost:5432/hospital_db";
            hikariConfig.setJdbcUrl(jdbcUrl);
            if (fallbackUsername != null) hikariConfig.setUsername(fallbackUsername);
            if (fallbackPassword != null) hikariConfig.setPassword(fallbackPassword);
        }

        // Production-tuned connection pool configurations
        hikariConfig.setMaximumPoolSize(10);
        hikariConfig.setMinimumIdle(2);
        hikariConfig.setIdleTimeout(30000);
        hikariConfig.setConnectionTimeout(30000);
        hikariConfig.setMaxLifetime(1800000);
        hikariConfig.setPoolName("CarePulseHikariPool");

        return new HikariDataSource(hikariConfig);
    }
}
