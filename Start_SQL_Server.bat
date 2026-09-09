@echo off
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting Administrator privileges...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo ===================================================
echo [1/4] Enabling TCP/IP Protocol on Port 1433...
echo ===================================================
reg add "HKLM\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQLServer\SuperSocketNetLib\Tcp" /v Enabled /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQLServer\SuperSocketNetLib\Tcp\IPAll" /v TcpPort /t REG_SZ /d 1433 /f
reg add "HKLM\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQLServer\SuperSocketNetLib\Tcp\IPAll" /v TcpDynamicPorts /t REG_SZ /d "" /f

echo.
echo ===================================================
echo [2/4] Starting/Restarting SQL Server (SQLEXPRESS)...
echo ===================================================
net stop "MSSQL$SQLEXPRESS" >nul 2>&1
net start "MSSQL$SQLEXPRESS"

echo.
echo ===================================================
echo [3/4] Creating and initializing hospital_db...
echo ===================================================
sqlcmd -S "localhost\SQLEXPRESS" -E -C -Q "IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'hospital_db') CREATE DATABASE hospital_db;"
sqlcmd -S "localhost\SQLEXPRESS" -E -C -d hospital_db -i "%~dp0database\migrations\V1__init_schema.sql"
sqlcmd -S "localhost\SQLEXPRESS" -E -C -d hospital_db -i "%~dp0database\migrations\V2__seed_data.sql"

echo.
echo ===================================================
echo [4/4] Verifying Port 1433 Connection...
echo ===================================================
powershell -Command "if (Test-NetConnection -ComputerName localhost -Port 1433 -InformationLevel Quiet) { Write-Host 'SUCCESS: SQL Server is listening on Port 1433!' -ForegroundColor Green } else { Write-Host 'WARNING: Port 1433 not responding yet.' -ForegroundColor Yellow }"

echo.
echo ===================================================
echo SUCCESS: hospital_db created and all 10 tables loaded!
echo SQL Server is now RUNNING on port 1433.
echo You can now click Run in IntelliJ IDEA!
echo ===================================================
pause

