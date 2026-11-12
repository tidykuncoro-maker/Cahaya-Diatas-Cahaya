# ========================================================
# Deploy "Cahaya Diatas Cahaya" ke GitHub
# ========================================================

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   🚀 DEPLOY APLIKASI 'CAHAYA DIATAS CAHAYA' KE GITHUB" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$gitPath = "C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd\git.exe"
if (-not (Test-Path $gitPath)) {
    $gitCmd = Get-Command git -ErrorAction SilentlyContinue
    if ($gitCmd) {
        $gitPath = $gitCmd.Source
    } else {
        Write-Error "Git tidak ditemukan di sistem."
        exit 1
    }
}

Set-Location -Path "D:\Lain-lain\AI\Gemini\Cahaya Diatas Cahaya"

Write-Host "1. Mempersiapkan berkas dan commit..." -ForegroundColor Green
& $gitPath add .
& $gitPath commit -m "fix(deploy): optimasi GitHub Pages, .nojekyll, favicon dan ikon PWA" 2>$null
& $gitPath branch -M main

Write-Host "2. Mengunggah ke GitHub..." -ForegroundColor Green
& $gitPath push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Green
    Write-Host "✅ BERHASIL PUSH KE GITHUB!" -ForegroundColor Green
    Write-Host "========================================================" -ForegroundColor Green
    Write-Host "Untuk mengaktifkan website online (GitHub Pages):"
    Write-Host "1. Buka: https://github.com/tidykuncoro-maker/Cahaya-Diatas-Cahaya/settings/pages" -ForegroundColor Cyan
    Write-Host "2. Pada 'Build and deployment', pilih Source: 'Deploy from a branch'"
    Write-Host "3. Pilih Branch: 'main' / '(root)', lalu klik Save"
    Write-Host ""
    Write-Host "Website Anda akan tayang di: https://tidykuncoro-maker.github.io/Cahaya-Diatas-Cahaya/" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "⚠️ Push memerlukan autentikasi GitHub." -ForegroundColor Yellow
    Write-Host "Gunakan Personal Access Token (PAT) jika diminta kata sandi:"
    Write-Host "git push https://<TOKEN>@github.com/tidykuncoro-maker/Cahaya-Diatas-Cahaya.git main" -ForegroundColor Cyan
}
