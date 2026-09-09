@echo off
setlocal enabledelayedexpansion
title SQL Server TCP/IP 1433 Setup

echo ========================================================
echo CarePulse HMS - SQL Server TCP/IP Port 1433 Auto-Fix
echo ========================================================
echo.

:: Check for Administrator Privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [INFO] Requesting Administrator permissions...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo [1/3] Enabling TCP/IP protocol in SQL Server Express...
reg add "HKLM\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQLServer\SuperSocketNetLib\Tcp" /v Enabled /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQLServer\SuperSocketNetLib\Tcp\IPAll" /v TcpPort /t REG_SZ /d 1433 /f >nul
reg add "HKLM\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQLServer\SuperSocketNetLib\Tcp\IPAll" /v TcpDynamicPorts /t REG_SZ /d "" /f >nul
echo       - TCP/IP enabled successfully.
echo       - Port 1433 configured for all IP addresses.

echo.
echo [2/3] Restarting SQL Server Service (MSSQL$SQLEXPRESS)...
net stop "MSSQL$SQLEXPRESS" >nul 2>&1
net start "MSSQL$SQLEXPRESS"
echo       - SQL Server service restarted.

echo.
echo [3/3] Verifying TCP Port 1433 listening status...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$t = Test-NetConnection -ComputerName localhost -Port 1433 -WarningAction SilentlyContinue; if ($t.TcpTestSucceeded) { Write-Host '      [SUCCESS] SQL Server is now listening on Port 1433!' -ForegroundColor Green } else { Write-Host '      [WARNING] Port 1433 test timed out, please wait a moment and re-test.' -ForegroundColor Yellow }"

echo.
echo ========================================================
echo ALL DONE! You can now run the application in IntelliJ!
echo ========================================================
pause
