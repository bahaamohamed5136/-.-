@echo off
cd /d "C:\Users\bahaa.mohamed\Desktop\programms\sadaqa"
surge --project . --domain sadaqa-mohamed.surge.sh
echo %date% %time% - Renewal completed >> "C:\Users\bahaa.mohamed\Desktop\programms\sadaqa\renewal.log"
