"""
Tests for Events API - Agenda feature
Tests CRUD operations for events including:
- GET /api/events (list all events, with optional category filter)
- POST /api/events (create event - requires auth)
- PUT /api/events/{id} (update event - requires auth)
- DELETE /api/events/{id} (delete event - requires auth)
"""

import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestEventsAPI:
    """Events CRUD endpoint tests"""

    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup test fixtures"""
        self.test_event_ids = []
        yield
        # Cleanup: Delete test events after each test class
        token = self._get_auth_token()
        if token:
            headers = {"Authorization": f"Bearer {token}"}
            for event_id in self.test_event_ids:
                try:
                    requests.delete(f"{BASE_URL}/api/events/{event_id}", headers=headers)
                except:
                    pass

    def _get_auth_token(self):
        """Helper to get auth token"""
        try:
            response = requests.post(f"{BASE_URL}/api/auth/login", json={
                "username": "admin",
                "password": "admin123"
            })
            if response.status_code == 200:
                return response.json().get("token")
        except:
            pass
        return None

    # ========== GET /api/events Tests ==========
    
    def test_get_events_returns_list(self):
        """GET /api/events - should return a list of events"""
        response = requests.get(f"{BASE_URL}/api/events")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        assert len(data) >= 5, f"Expected at least 5 events, got {len(data)}"
        
        # Verify event structure
        if len(data) > 0:
            event = data[0]
            assert "id" in event, "Event should have id"
            assert "title" in event, "Event should have title"
            assert "date" in event, "Event should have date"
            assert "time" in event, "Event should have time"
            assert "location" in event, "Event should have location"
            assert "category" in event, "Event should have category"

    def test_get_events_filter_by_liturgie(self):
        """GET /api/events?category=Liturgie - should filter by Liturgie category"""
        response = requests.get(f"{BASE_URL}/api/events?category=Liturgie")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        
        # All returned events should be in Liturgie category
        for event in data:
            assert event["category"] == "Liturgie", f"Expected Liturgie category, got {event['category']}"

    def test_get_events_filter_by_communaute(self):
        """GET /api/events?category=Communauté - should filter by Communauté category"""
        response = requests.get(f"{BASE_URL}/api/events?category=Communauté")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        
        for event in data:
            assert event["category"] == "Communauté"

    def test_get_events_filter_by_jeunesse(self):
        """GET /api/events?category=Jeunesse - should filter by Jeunesse category"""
        response = requests.get(f"{BASE_URL}/api/events?category=Jeunesse")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        
        for event in data:
            assert event["category"] == "Jeunesse"

    def test_get_events_filter_by_solidarite(self):
        """GET /api/events?category=Solidarité - should filter by Solidarité category"""
        response = requests.get(f"{BASE_URL}/api/events?category=Solidarité")
        
        assert response.status_code == 200
        data = response.json()
        
        for event in data:
            assert event["category"] == "Solidarité"

    def test_get_events_filter_by_formation(self):
        """GET /api/events?category=Formation - should filter by Formation category"""
        response = requests.get(f"{BASE_URL}/api/events?category=Formation")
        
        assert response.status_code == 200
        data = response.json()
        
        for event in data:
            assert event["category"] == "Formation"

    def test_get_events_include_past(self):
        """GET /api/events?include_past=true - should include past events"""
        response = requests.get(f"{BASE_URL}/api/events?include_past=true")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    # ========== Authentication Tests ==========

    def test_auth_login_success(self):
        """POST /api/auth/login - admin login should succeed"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "username": "admin",
            "password": "admin123"
        })
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "token" in data, "Response should contain token"
        assert "username" in data, "Response should contain username"
        assert data["username"] == "admin"

    def test_auth_login_invalid_credentials(self):
        """POST /api/auth/login - invalid credentials should return 401"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "username": "wrong",
            "password": "wrongpassword"
        })
        
        assert response.status_code == 401

    # ========== POST /api/events Tests (Create) ==========

    def test_create_event_requires_auth(self):
        """POST /api/events - should require authentication"""
        response = requests.post(f"{BASE_URL}/api/events", json={
            "title": "TEST_Unauthorized Event",
            "date": "2026-05-01",
            "time": "10:00",
            "location": "Test Location",
            "category": "Communauté"
        })
        
        # Should return 401 or 403 without auth
        assert response.status_code in [401, 403]

    def test_create_event_success(self):
        """POST /api/events - authenticated user should create event"""
        token = self._get_auth_token()
        assert token is not None, "Failed to get auth token"
        
        headers = {"Authorization": f"Bearer {token}"}
        event_data = {
            "title": "TEST_New Parish Event",
            "description": "Test event description for testing",
            "date": "2026-06-15",
            "time": "14:00",
            "end_time": "16:00",
            "location": "Test Church",
            "category": "Communauté"
        }
        
        response = requests.post(f"{BASE_URL}/api/events", json=event_data, headers=headers)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data, "Created event should have an id"
        assert data["title"] == event_data["title"]
        assert data["description"] == event_data["description"]
        assert data["date"] == event_data["date"]
        assert data["time"] == event_data["time"]
        assert data["location"] == event_data["location"]
        assert data["category"] == event_data["category"]
        
        # Track for cleanup
        self.test_event_ids.append(data["id"])
        
        # Verify persistence with GET
        get_response = requests.get(f"{BASE_URL}/api/events?include_past=true")
        events = get_response.json()
        created_event = next((e for e in events if e["id"] == data["id"]), None)
        assert created_event is not None, "Created event should be retrievable via GET"
        assert created_event["title"] == event_data["title"]

    # ========== PUT /api/events/{id} Tests (Update) ==========

    def test_update_event_requires_auth(self):
        """PUT /api/events/{id} - should require authentication"""
        # Get an existing event first
        events_response = requests.get(f"{BASE_URL}/api/events")
        events = events_response.json()
        
        if len(events) > 0:
            event_id = events[0]["id"]
            response = requests.put(f"{BASE_URL}/api/events/{event_id}", json={
                "title": "Unauthorized Update"
            })
            
            assert response.status_code in [401, 403]

    def test_update_event_success(self):
        """PUT /api/events/{id} - authenticated user should update event"""
        token = self._get_auth_token()
        assert token is not None
        
        headers = {"Authorization": f"Bearer {token}"}
        
        # First create an event to update
        create_response = requests.post(f"{BASE_URL}/api/events", json={
            "title": "TEST_Event To Update",
            "date": "2026-07-01",
            "time": "09:00",
            "location": "Original Location",
            "category": "Formation"
        }, headers=headers)
        
        assert create_response.status_code == 200
        event_id = create_response.json()["id"]
        self.test_event_ids.append(event_id)
        
        # Update the event
        update_data = {
            "title": "TEST_Updated Event Title",
            "location": "Updated Location",
            "time": "10:30"
        }
        
        update_response = requests.put(f"{BASE_URL}/api/events/{event_id}", 
                                        json=update_data, headers=headers)
        
        assert update_response.status_code == 200
        
        updated_event = update_response.json()
        assert updated_event["title"] == update_data["title"]
        assert updated_event["location"] == update_data["location"]
        assert updated_event["time"] == update_data["time"]
        # Original category should remain unchanged
        assert updated_event["category"] == "Formation"

    def test_update_nonexistent_event(self):
        """PUT /api/events/{id} - updating non-existent event should return 404"""
        token = self._get_auth_token()
        assert token is not None
        
        headers = {"Authorization": f"Bearer {token}"}
        fake_id = str(uuid.uuid4())
        
        response = requests.put(f"{BASE_URL}/api/events/{fake_id}", 
                               json={"title": "Should Fail"}, headers=headers)
        
        assert response.status_code == 404

    # ========== DELETE /api/events/{id} Tests ==========

    def test_delete_event_requires_auth(self):
        """DELETE /api/events/{id} - should require authentication"""
        events_response = requests.get(f"{BASE_URL}/api/events")
        events = events_response.json()
        
        if len(events) > 0:
            event_id = events[0]["id"]
            response = requests.delete(f"{BASE_URL}/api/events/{event_id}")
            
            assert response.status_code in [401, 403]

    def test_delete_event_success(self):
        """DELETE /api/events/{id} - authenticated user should delete event"""
        token = self._get_auth_token()
        assert token is not None
        
        headers = {"Authorization": f"Bearer {token}"}
        
        # Create event to delete
        create_response = requests.post(f"{BASE_URL}/api/events", json={
            "title": "TEST_Event To Delete",
            "date": "2026-08-01",
            "time": "15:00",
            "location": "Delete Test Location",
            "category": "Jeunesse"
        }, headers=headers)
        
        assert create_response.status_code == 200
        event_id = create_response.json()["id"]
        
        # Delete the event
        delete_response = requests.delete(f"{BASE_URL}/api/events/{event_id}", headers=headers)
        
        assert delete_response.status_code == 200
        
        # Verify deletion - event should not be in list
        get_response = requests.get(f"{BASE_URL}/api/events?include_past=true")
        events = get_response.json()
        deleted_event = next((e for e in events if e["id"] == event_id), None)
        assert deleted_event is None, "Deleted event should not be retrievable"

    def test_delete_nonexistent_event(self):
        """DELETE /api/events/{id} - deleting non-existent event should return 404"""
        token = self._get_auth_token()
        assert token is not None
        
        headers = {"Authorization": f"Bearer {token}"}
        fake_id = str(uuid.uuid4())
        
        response = requests.delete(f"{BASE_URL}/api/events/{fake_id}", headers=headers)
        
        assert response.status_code == 404


class TestExistingEventsData:
    """Tests to verify the 5 seed events exist with correct data"""

    def test_messe_chandeleur_exists(self):
        """Verify 'Messe de la Chandeleur' event exists"""
        response = requests.get(f"{BASE_URL}/api/events?category=Liturgie")
        events = response.json()
        
        messe = next((e for e in events if "Chandeleur" in e["title"]), None)
        assert messe is not None, "Messe de la Chandeleur should exist"
        assert messe["date"] == "2026-03-15"
        assert messe["category"] == "Liturgie"

    def test_repas_careme_exists(self):
        """Verify 'Repas partagé de Carême' event exists"""
        response = requests.get(f"{BASE_URL}/api/events?category=Communauté")
        events = response.json()
        
        repas = next((e for e in events if "Carême" in e["title"]), None)
        assert repas is not None, "Repas partagé de Carême should exist"
        assert repas["date"] == "2026-03-22"
        assert repas["category"] == "Communauté"

    def test_groupe_jeunes_exists(self):
        """Verify 'Groupe de jeunes' event exists"""
        response = requests.get(f"{BASE_URL}/api/events?category=Jeunesse")
        events = response.json()
        
        groupe = next((e for e in events if "jeunes" in e["title"].lower()), None)
        assert groupe is not None, "Groupe de jeunes event should exist"
        assert groupe["date"] == "2026-03-28"
        assert groupe["category"] == "Jeunesse"

    def test_collecte_alimentaire_exists(self):
        """Verify 'Collecte alimentaire' event exists"""
        response = requests.get(f"{BASE_URL}/api/events?category=Solidarité")
        events = response.json()
        
        collecte = next((e for e in events if "Collecte" in e["title"]), None)
        assert collecte is not None, "Collecte alimentaire should exist"
        assert collecte["date"] == "2026-04-05"
        assert collecte["category"] == "Solidarité"

    def test_parcours_alpha_exists(self):
        """Verify 'Parcours Alpha' event exists"""
        response = requests.get(f"{BASE_URL}/api/events?category=Formation")
        events = response.json()
        
        alpha = next((e for e in events if "Alpha" in e["title"]), None)
        assert alpha is not None, "Parcours Alpha should exist"
        assert alpha["date"] == "2026-04-10"
        assert alpha["category"] == "Formation"
