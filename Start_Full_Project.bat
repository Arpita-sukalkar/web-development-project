@echo off
title CarePulse HMS - System Launcher
echo ========================================================
echo CarePulse HMS - Full Stack Launcher
echo ========================================================
echo.

:: 1. Verify SQL Server
echo [1/3] Checking SQL Server (Port 1433)...
net start "MSSQL$SQLEXPRESS" >nul 2>&1

:: 2. Start Backend
echo [2/3] Starting Spring Boot Backend (Port 8085)...
start "CarePulse Backend" /B "C:\Program Files\Java\jdk-25\bin\java.exe" --enable-native-access=ALL-UNNAMED "-Dspring.output.ansi.enabled=always" "-Dfile.encoding=UTF-8" @%~dp0backend\classpath.arg com.yourorg.appname.Application

:: Wait 5 seconds for backend warm-up
timeout /t 5 /nobreak >nul

:: 3. Start Frontend
echo [3/3] Starting Frontend (Port 5173)...
cd /d "%~dp0frontend"
start "CarePulse Frontend" cmd /c "npm run dev"

echo.
echo ========================================================
echo CarePulse HMS is running!
echo Access the portal at: http://localhost:5173
echo ========================================================
timeout /t 3 /nobreak >nul
start http://localhost:5173
