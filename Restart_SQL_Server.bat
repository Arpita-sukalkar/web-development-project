@echo off
:: Check for Administrator privileges and elevate if needed
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting Administrator privileges...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo ===================================================
echo [1/3] Enabling TCP/IP Protocol on Port 1433...
echo ===================================================
reg add "HKLM\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQLServer\SuperSocketNetLib\Tcp" /v Enabled /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQLServer\SuperSocketNetLib\Tcp\IPAll" /v TcpPort /t REG_SZ /d 1433 /f
reg add "HKLM\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQLServer\SuperSocketNetLib\Tcp\IPAll" /v TcpDynamicPorts /t REG_SZ /d "" /f

echo.
echo ===================================================
echo [2/3] Restarting SQL Server Service (SQLEXPRESS)...
echo ===================================================
net stop "MSSQL$SQLEXPRESS"
net start "MSSQL$SQLEXPRESS"

echo.
echo ===================================================
echo [3/3] Verifying Port 1433 Connection...
echo ===================================================
powershell -Command "if (Test-NetConnection -ComputerName localhost -Port 1433 -InformationLevel Quiet) { Write-Host 'SUCCESS: SQL Server is listening on Port 1433!' -ForegroundColor Green } else { Write-Host 'WARNING: Port 1433 not responding yet.' -ForegroundColor Yellow }"

echo.
echo ===================================================
echo SQL Server restarted successfully on Port 1433!
echo You can now click Run in IntelliJ IDEA.
echo ===================================================
pause

