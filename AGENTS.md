# Agent context — interview template

## What this repo is

Template for **AI-assisted coding interviews**: build a **small** full-stack web app under time pressure. Prefer shipping over polish unless asked.

## Stack


| Layer    | Choice                     |
| -------- | -------------------------- |
| API      | **Python** + **FastAPI**   |
| Frontend | **React** + **TypeScript** |


Layout: `backend/`, `frontend/`.

## Backend (Python / FastAPI)

- **Package/runtime**: `**uv`** — deps, venv, runs (`uv run`, `uv sync`, etc.). Don’t introduce pip-only workflows as default.
- **Testing**: `**pytest`** — prefer `uv run pytest` (or project-defined scripts).
- **Imports**: **module top only**. No imports inside functions/methods/classes (incl. lazy imports). If circular import forces a redesign, refactor modules instead of hiding imports in bodies.

### Project structure

```text
backend/
├── main.py                 # FastAPI entry (uvicorn target)
├── config.py               # Pydantic Settings
├── dependencies.py         # shared Depends / DI
├── api/
│   ├── router.py           # include_router from endpoints/
│   └── endpoints/          # route handlers
├── schemas/                # Pydantic request/response models
├── services/               # business logic
└── tests/                  # pytest
```

## Frontend (React / TypeScript)

- **Package manager**: `**npm`** (matches Vite `create` defaults). Use `npm install`, `npm run dev`, `npm run build`, etc.
- **API calls**: `**axios`** for HTTP requests to the backend.

### Project structure

```text
frontend/
└── src/
    ├── api/                # axios client + one module per feature
    ├── components/         # shared reusable UI
    ├── pages/              # one file per route / view
    ├── types/              # shared TypeScript types
    ├── App.tsx             # routing, pages, and top-level layout only
    └── main.tsx            # Vite / React DOM entry
```

## How agents should communicate (interview mode)

- **Concision first**: shortest reply that still answers / implements. Bullets, fragments OK.
- **Grammar optional** when it saves tokens — clarity > prose.
- **Skip**: praise, long rationale, “happy to help”, repeated restatements of the question.
- **Keep**: exact commands, file paths, and anything needed to run or review the change.

## General coding bias

- Small vertical slices; avoid scope creep and drive-by refactors.
- Match existing style in touched files.
- Don’t add docs/files the user didn’t ask for.

