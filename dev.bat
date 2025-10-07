@echo off
cls
echo Starting nodemon...
start /min nodemon
TIMEOUT /T 10 /NOBREAK
cls
curl -i -X GET http://localhost:8000
echo.
echo ----------------------------------------------------------------------------------------------------------------
echo Press 'O' to open in Edge browser
set /p choice=
if /i "%choice%"=="o" goto A
goto :eof

:A
echo Opening browser...
start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -inprivate "http://localhost:8000" --new-window
exit