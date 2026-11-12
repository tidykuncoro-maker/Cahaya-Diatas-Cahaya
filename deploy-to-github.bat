@echo off
chcp 65001 >nul
title Deploy Cahaya Diatas Cahaya ke GitHub
echo ========================================================
echo    🚀 DEPLOY APLIKASI "CAHAYA DIATAS CAHAYA" KE GITHUB
echo ========================================================
echo.
echo Repositori Target:
echo https://github.com/tidykuncoro-maker/Cahaya-Diatas-Cahaya.git
echo.
echo Menyiapkan Git...

set "GIT_CMD=C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd\git.exe"

if not exist "%GIT_CMD%" (
    where git >nul 2>nul
    if %errorlevel% equ 0 (
        set "GIT_CMD=git"
    ) else (
        echo [ERROR] Git tidak ditemukan.
        pause
        exit /b 1
    )
)

cd /d "D:\Lain-lain\AI\Gemini\Cahaya Diatas Cahaya"

echo Memeriksa status repositori...
"%GIT_CMD%" add .
"%GIT_CMD%" commit -m "feat: Update Aplikasi Adzan Cahaya Diatas Cahaya" >nul 2>nul
"%GIT_CMD%" branch -M main
"%GIT_CMD%" remote remove origin >nul 2>nul
"%GIT_CMD%" remote add origin https://github.com/tidykuncoro-maker/Cahaya-Diatas-Cahaya.git

echo.
echo --------------------------------------------------------
echo Pilih metode autentikasi GitHub Anda:
echo --------------------------------------------------------
echo [1] Gunakan Personal Access Token (PAT) GitHub [Rekomendasi Cepat]
echo [2] Login Standar Git Browser / Credential Manager
echo --------------------------------------------------------
set /p opt="Pilihan Anda (1 atau 2): "

if "%opt%"=="1" (
    echo.
    echo Masukkan GitHub Personal Access Token (PAT) Anda:
    echo (Bisa dibuat di https://github.com/settings/tokens dengan izin 'repo')
    set /p token="Token GitHub: "
    if defined token (
        echo.
        echo Mengunggah ke GitHub...
        "%GIT_CMD%" push -u "https://%token%@github.com/tidykuncoro-maker/Cahaya-Diatas-Cahaya.git" main
    ) else (
        echo Token tidak boleh kosong.
    )
) else (
    echo.
    echo Mengunggah ke GitHub...
    "%GIT_CMD%" push -u origin main
)

echo.
echo ========================================================
echo Selesai! Jika push berhasil, aktifkan GitHub Pages di:
echo https://github.com/tidykuncoro-maker/Cahaya-Diatas-Cahaya/settings/pages
echo (Pilih Branch: main, Folder: /root, klik Save)
echo ========================================================
echo.
pause
