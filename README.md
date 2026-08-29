# Match Fix — Public Deployment

Public deployment repository for **Match Fix**.

Canonical private source repository: `fiverocks-dev/match-fix`.

This repository is intentionally deployment-only. It must contain only already-built, verified static output and deployment metadata required to serve approved Match Fix builds.

## Rules

- Do not add private development source, tests, internal design documents, local scripts, environment files, credentials, or signing material.
- Do not compile, bundle, test, sign, or rebuild the game in this repository.
- Do not use self-hosted project CI here.
- Do not publish source maps such as `*.map`.
- Every deployed channel must carry machine-readable provenance identifying `fiverocks-dev/match-fix` and the exact source commit SHA.
- A deployment must fail closed rather than substitute another SHA, branch, repository, latest build, or implicit rebuild.

The project follows the applicable policies in `fiverocksgames/devops-standards`, especially `web/PUBLIC_WEB_GAME_DEPLOYMENT_POLICY.md`.

The private source repository now defines the Match Fix web prerelease profile. Preview output is intended for `/preview/` on `main` and must originate from a verified exact-SHA private build. Publication uses a short-lived GitHub App installation token created in the source repository's protected `preview` environment. The App must be installed for this repository with the minimum Contents write permission, and the preview activation gate must be enabled.
