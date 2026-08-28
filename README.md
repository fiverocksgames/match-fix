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

Deployment is not yet enabled. Static application output will be added only after the private source repository defines and validates its build, test, provenance, authorization, and publishing profile.
