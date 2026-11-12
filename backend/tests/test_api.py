from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    assert client.get("/health").json() == {"status": "ok"}

def test_metrics_are_consistent():
    response = client.get("/api/v1/metrics")
    assert response.status_code == 200
    payload = response.json()
    assert payload["data_source"] == "synthetic-demo"
    assert payload["completed_items"] == 24
    assert sum(w["count"] for w in payload["weekly_throughput"]) == 24
    assert payload["average_cycle_time_days"] > 0
