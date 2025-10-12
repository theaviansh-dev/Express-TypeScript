@echo off
cls
echo Starting nodemon...
start /min nodemon
TIMEOUT /T 10 /NOBREAK
cls
curl -i -X GET http://localhost:8000
echo.
echo Press 'o' to open in Edge browser and 'e' to quit
set /p choice=
if /i "%choice%"=="O" goto A
if /i "%choice%"=="o" goto A
if /i "%choice%"=="e" goto B
goto :eof

:A
echo Opening browser...
start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -inprivate "http://localhost:8000" --new-window
exit

:B
echo exiting..
exit
exit