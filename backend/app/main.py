"""Engineering Intelligence demo API.

All records are synthetic and must not be interpreted as real team performance.
"""
from datetime import date, timedelta
from statistics import mean
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Engineering Intelligence", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], allow_credentials=False, allow_methods=["GET"], allow_headers=["*"])

TODAY = date(2026, 11, 1)
DELIVERIES = [
    {"id": i, "started": TODAY - timedelta(days=i + (i % 4) + 2),
     "completed": TODAY - timedelta(days=i), "team": "demo-squad"}
    for i in range(1, 25)
]

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/v1/metrics")
def metrics():
    cycle_times = [(d["completed"] - d["started"]).days for d in DELIVERIES]
    return {
        "data_source": "synthetic-demo",
        "period": {"start": str(min(d["completed"] for d in DELIVERIES)),
                   "end": str(max(d["completed"] for d in DELIVERIES))},
        "completed_items": len(DELIVERIES),
        "average_cycle_time_days": round(mean(cycle_times), 2),
        "weekly_throughput": [
            {"week": str(TODAY - timedelta(days=7 * n)),
             "count": sum(1 for d in DELIVERIES if 7 * n <= (TODAY - d["completed"]).days < 7 * (n + 1))}
            for n in range(4)
        ],
        "note": "Demo delivery metrics, not DORA metrics. No productivity inference."
    }
