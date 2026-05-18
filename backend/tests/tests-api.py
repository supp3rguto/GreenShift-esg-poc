from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Bem-vindo à API do GreenShift"}

def test_calculate_emissions_valid_data():
    payload = {
        "energy_kwh": 150.5,
        "transport_km": 50.0,
        "waste_kg": 10.0
    }
    response = client.post("/api/calculations/", json=payload)
    
    assert response.status_code == 200
    data = response.json()
    
    assert "total_emissions" in data
    assert data["total_emissions"] > 0
    assert data["energy_kwh"] == 150.5

def test_calculate_emissions_invalid_data():
    payload = {
        "energy_kwh": -10.0,
        "transport_km": 50.0,
        "waste_kg": 10.0
    }
    response = client.post("/api/calculations/", json=payload)
    assert response.status_code == 422 # 422 Unprocessable Entity 