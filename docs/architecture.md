# Architecture — v0.1

## Context
A standalone FastAPI service exposes synthetic delivery data for portfolio demonstration. No external accounts, customer data or credentials are used.

## Components
- FastAPI REST API (`backend/app/main.py`)
- Deterministic in-memory synthetic dataset
- Pytest integration tests

## Planned evolution
1. React/TypeScript dashboard with accessible charts.
2. PostgreSQL persistence and documented import schema.
3. Deployment frequency, lead time for changes, change failure rate and failed deployment recovery time, each with explicitly defined event sources.
4. Authentication, filtering, observability and CI.

## ADR-001: Start with deterministic synthetic data
**Status:** Accepted.
**Decision:** Use a reproducible dataset before integrating external tools.
**Reason:** Allows safe, inspectable metrics without exposing private project information.
**Trade-off:** This version does not measure real organizations or DORA outcomes.
