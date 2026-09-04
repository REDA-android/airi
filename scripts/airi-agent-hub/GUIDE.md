# 🤖 Guide d'utilisation du Hub d'Agents AIRI

Ce dossier permet de relier votre avatar **AIRI** avec les modèles locaux **Qwen** et les agents autonomes **Jules SDK**.

---

## 1. Connecter AIRI au serveur local Qwen
Ce serveur transforme votre modèle Qwen en un serveur compatible avec OpenAI sur votre machine.

### Étape 1 : Démarrer le serveur
Dans un terminal PowerShell :
`powershell
python scripts/airi-agent-hub/start-qwen-server.py
`
Le serveur démarre sur http://127.0.0.1:8000/v1.

### Étape 2 : Connecter AIRI sur le Web
1. Rendez-vous sur votre application : [https://reda-android.github.io/airi/](https://reda-android.github.io/airi/)
2. Ouvrez **Paramètres (⚙️)** > **Fournisseurs (Providers)**.
3. Cliquez sur le **+** et choisissez **Compatible avec OpenAI**.
4. Remplissez les champs :
   * **Base URL** : http://127.0.0.1:8000/v1
   * **API Key** : qwen-local (ou n'importe quel texte)
   * **Model** : Qwen
5. Retournez sur l'écran d'accueil : votre avatar AIRI pense et parle désormais via votre propre modèle Qwen local !

---

## 2. Faire coder AIRI de manière autonome avec Jules SDK
Le script jules-coding-agent.mjs utilise le SDK Jules officiel de Google Labs pour planifier, écrire du code et créer des Pull Requests sur votre dépôt GitHub.

### Lancer une tâche de code autonome :
`powershell
node scripts/airi-agent-hub/jules-coding-agent.mjs "REDA-android/airi" "Corrige un bug et ajoute un test"
`
L'agent va :
1. Analyser votre dépôt GitHub REDA-android/airi.
2. Générer un plan d'action d'ingénierie logicielle.
3. Modifier le code dans un environnement Cloud sécurisé.
4. Créer automatiquement une **Pull Request** sur votre GitHub !
