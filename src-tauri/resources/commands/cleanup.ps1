cmd.exe /c start cmd /k CHKDSK /F /R /X
cmd.exe /c start cmd /k del /q /f /s %TEMP%\\
cmd.exe /c start cmd /k del /q /s /q C:\\Windows\\Temp\\
cmd.exe /c start cmd /k sfc /scannow
cmd.exe /c start cmd /k del /q /f /s C:\$Recycle.Bin
