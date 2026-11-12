# Engineering Intelligence

An open-source portfolio project exploring engineering delivery analytics, software architecture and evidence-based continuous improvement.

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

## Run tests
```bash
cd backend
python -m pytest -q
```

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
- [ ] React + TypeScript dashboard
- [ ] PostgreSQL and imports
- [ ] DORA metrics from explicit deployment and incident events
- [ ] CI and cloud deployment

**Interpretation note:** Throughput and cycle time are process indicators; they do not measure individual developer productivity. No actual company or customer data is included.

## License
License selection pending. Do not assume this code is licensed for reuse until a LICENSE file is added.
