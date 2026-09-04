Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  🌟 BIENVENUE DANS LE HUB D'AGENTS AIRI (Local)" -ForegroundColor Yellow
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "1. Lancer le serveur local Qwen (Compatible avec OpenAI)" -ForegroundColor Green
Write-Host "2. Lancer l'Agent Codeur Jules (Creation de code autonome)" -ForegroundColor Green
Write-Host "3. Quitter"
Write-Host ""
$choice = Read-Host "Votre choix (1 ou 2)"

if ($choice -eq "1") {
    Write-Host "
Installation des dependances FastAPI et Uvicorn..." -ForegroundColor Yellow
    pip install fastapi uvicorn sse-starlette pydantic
    Write-Host "
Demarrage du serveur Qwen..." -ForegroundColor Green
    python scripts/airi-agent-hub/start-qwen-server.py
} elseif ($choice -eq "2") {
    $task = Read-Host "
Quelle tache de code voulez-vous donner a Jules ? "
    node scripts/airi-agent-hub/jules-coding-agent.mjs "REDA-android/airi" "$task"
} else {
    Write-Host "Fermeture."
}
