# Engineering Intelligence

An open-source portfolio project exploring engineering delivery analytics, software architecture and evidence-based continuous improvement.

**[Live dashboard (synthetic demo)](https://engineering-intelligence-pi.vercel.app/)** — hosted on Vercel. The public demo currently uses fixed preview data; the backend API is not deployed.

> **Status:** v0.1 — working API foundation. The web dashboard, deployment and DORA metrics are planned, not implemented yet. All data is synthetic.

## Current capabilities
- FastAPI REST endpoint with deterministic sample delivery records
- Completed item count, average cycle time and weekly throughput
- Health check, API docs and automated tests
- Architecture documentation and an explicit evolution roadmap

## Quick start

Requires Python 3.10+.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open http://127.0.0.1:8000/docs or request `GET /api/v1/metrics`.

## Run the dashboard

Requires Node.js 20+.

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

By default, the dashboard shows explicitly labeled synthetic preview data.
To connect it to the local API, copy `frontend/.env.example` to
`frontend/.env` and restart Vite. The backend permits requests from
`localhost:5173` and `127.0.0.1:5173`.

Production deployment is **not yet configured**. Do not present this
repository as a hosted application.

## Run tests
```bash
cd backend
python -m pytest -q
```

## Frontend validation

```bash
cd frontend
npm install
npm run build
```

GitHub Actions contains independent workflows for backend tests and
frontend build. A successful workflow run must be verified in the Actions
tab; the existence of workflow files does not imply a passing build.

## Endpoints
| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Service health |
| GET | `/api/v1/metrics` | Synthetic delivery analytics |
| GET | `/docs` | Interactive OpenAPI documentation |

## Architecture
See [architecture and ADR-001](docs/architecture.md).

## Roadmap
- [x] Deterministic delivery metrics API
- [x] API tests and architecture documentation
- [x] React + TypeScript dashboard (preview mode)
- [ ] PostgreSQL and imports
- [ ] DORA metrics from explicit deployment and incident events
- [x] CI workflow definitions (results pending verification)
- [ ] Cloud deployment

**Interpretation note:** Throughput and cycle time are process indicators; they do not measure individual developer productivity. No actual company or customer data is included.

## License
License selection pending. Do not assume this code is licensed for reuse until a LICENSE file is added.
