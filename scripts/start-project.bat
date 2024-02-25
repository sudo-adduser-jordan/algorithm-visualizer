@REM Execute this script via cli or double click in file explorer or desktop.

set ProjectPath="C:\Users\user1\Desktop\GitHub\algorithm-visualizer\"
@REM code / nvim / vim
set Editor=code
@REM firefox / chrome / msedge
set Browser=firefox

cd %ProjectPath%
call github .
start cmd.exe /k npm run dev
start %Browser% localhost:3000
call %Editor% .
