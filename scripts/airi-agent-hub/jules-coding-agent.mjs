import { jules } from '../../submodules/jules-sdk/packages/core/dist/index.js';

console.log(
======================================================
  🤖 AIRI Jules Coding Agent
  Autonomously plan, code, and submit Pull Requests
======================================================
);

export async function runCodingTask(repo, prompt) {
  console.log([AIRI Jules] Lancement de la tache sur ...);
  console.log([AIRI Jules] Consigne : \n);

  try {
    const session = await jules.session({
      prompt,
      source: { github: repo, baseBranch: 'main' },
      autoPr: true,
    });

    console.log([AIRI Jules] Session demarree ! ID: );

    for await (const activity of session.stream()) {
      switch (activity.type) {
        case 'planGenerated':
          console.log([Plan genere]  etapes planifiees par l'agent.);
          break;
        case 'progressUpdated':
          console.log([Progression] );
          break;
        case 'sessionCompleted':
          console.log('[Succes] La session de code s\'est terminee avec succes !');
          break;
      }
    }

    const outcome = await session.result();
    if (outcome.pullRequest) {
      console.log(\n🎉 Pull Request creee automatiquement : );
    }
  } catch (err) {
    console.error([AIRI Jules Erreur] : );
  }
}

// CLI usage
const args = process.argv.slice(2);
const repo = args[0] || 'REDA-android/airi';
const task = args[1] || 'Ameliore la documentation et verifie les tests de AIRI.';

runCodingTask(repo, task);
