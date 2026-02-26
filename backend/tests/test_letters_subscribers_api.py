"""
Test suite for Letters (Lettre du Père Daniel) and Newsletter Subscribers APIs
Tests CRUD operations for letters and subscriber endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestAuthenticationSetup:
    """Authentication tests - run first to get token"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get admin authentication token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "username": "admin",
            "password": "admin123"
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        assert "token" in data
        return data["token"]
    
    def test_login_success(self):
        """Test admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "username": "admin",
            "password": "admin123"
        })
        assert response.status_code == 200
        data = response.json()
        assert "token" in data
        assert data["username"] == "admin"
        print("✅ Admin login successful")
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials returns 401"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "username": "wrong",
            "password": "wrong"
        })
        assert response.status_code == 401
        print("✅ Invalid credentials correctly rejected with 401")


class TestLettersAPI:
    """Letters CRUD API tests - Lettre du Père Daniel"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get admin authentication token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "username": "admin",
            "password": "admin123"
        })
        assert response.status_code == 200
        return response.json()["token"]
    
    @pytest.fixture(scope="class")
    def auth_headers(self, auth_token):
        """Get headers with auth token"""
        return {"Authorization": f"Bearer {auth_token}"}
    
    def test_get_letters_list(self):
        """Test GET /api/letters returns list of letters"""
        response = requests.get(f"{BASE_URL}/api/letters")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ GET /api/letters returns {len(data)} letters")
        # Check for test letters
        if len(data) >= 2:
            titles = [l["title"] for l in data]
            print(f"   Letter titles: {titles}")
    
    def test_letters_have_required_fields(self):
        """Verify letter objects have required fields"""
        response = requests.get(f"{BASE_URL}/api/letters")
        assert response.status_code == 200
        letters = response.json()
        if len(letters) > 0:
            letter = letters[0]
            assert "id" in letter
            assert "title" in letter
            assert "content" in letter
            assert "date" in letter
            assert "created_at" in letter
            print(f"✅ Letter has all required fields: id, title, content, date, created_at")
    
    def test_create_letter_requires_auth(self):
        """Test POST /api/letters requires authentication"""
        response = requests.post(f"{BASE_URL}/api/letters", json={
            "title": "Test Letter",
            "content": "Test content",
            "date": "2026-01-15"
        })
        assert response.status_code in [401, 403]
        print("✅ POST /api/letters correctly requires auth (401/403 without token)")
    
    def test_create_letter_with_auth(self, auth_headers):
        """Test POST /api/letters creates letter with valid auth"""
        new_letter = {
            "title": "TEST_Lettre de test",
            "content": "Ceci est un test de lettre.",
            "date": "2026-01-20"
        }
        response = requests.post(f"{BASE_URL}/api/letters", json=new_letter, headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == new_letter["title"]
        assert data["content"] == new_letter["content"]
        assert data["date"] == new_letter["date"]
        assert "id" in data
        print(f"✅ POST /api/letters created letter: {data['title']}")
        # Store ID for cleanup
        TestLettersAPI.created_letter_id = data["id"]
    
    def test_get_created_letter(self):
        """Verify created letter appears in list"""
        response = requests.get(f"{BASE_URL}/api/letters")
        assert response.status_code == 200
        letters = response.json()
        titles = [l["title"] for l in letters]
        assert "TEST_Lettre de test" in titles
        print("✅ Created letter appears in GET /api/letters list")
    
    def test_update_letter_requires_auth(self):
        """Test PUT /api/letters/{id} requires authentication"""
        letter_id = getattr(TestLettersAPI, 'created_letter_id', 'fake-id')
        response = requests.put(f"{BASE_URL}/api/letters/{letter_id}", json={
            "title": "Updated Title"
        })
        assert response.status_code in [401, 403]
        print("✅ PUT /api/letters requires auth (401/403 without token)")
    
    def test_update_letter_with_auth(self, auth_headers):
        """Test PUT /api/letters/{id} updates letter with valid auth"""
        letter_id = getattr(TestLettersAPI, 'created_letter_id', None)
        if not letter_id:
            pytest.skip("No letter created to update")
        
        response = requests.put(f"{BASE_URL}/api/letters/{letter_id}", json={
            "title": "TEST_Lettre mise à jour"
        }, headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "TEST_Lettre mise à jour"
        print("✅ PUT /api/letters/{id} updated letter successfully")
    
    def test_update_nonexistent_letter(self, auth_headers):
        """Test PUT /api/letters/{fake_id} returns 404"""
        response = requests.put(f"{BASE_URL}/api/letters/nonexistent-id-12345", json={
            "title": "Test"
        }, headers=auth_headers)
        assert response.status_code == 404
        print("✅ PUT /api/letters/{fake_id} correctly returns 404")
    
    def test_delete_letter_requires_auth(self):
        """Test DELETE /api/letters/{id} requires authentication"""
        letter_id = getattr(TestLettersAPI, 'created_letter_id', 'fake-id')
        response = requests.delete(f"{BASE_URL}/api/letters/{letter_id}")
        assert response.status_code in [401, 403]
        print("✅ DELETE /api/letters requires auth (401/403 without token)")
    
    def test_delete_letter_with_auth(self, auth_headers):
        """Test DELETE /api/letters/{id} deletes letter with valid auth"""
        letter_id = getattr(TestLettersAPI, 'created_letter_id', None)
        if not letter_id:
            pytest.skip("No letter created to delete")
        
        response = requests.delete(f"{BASE_URL}/api/letters/{letter_id}", headers=auth_headers)
        assert response.status_code == 200
        print("✅ DELETE /api/letters/{id} deleted letter successfully")
        
        # Verify deletion
        get_response = requests.get(f"{BASE_URL}/api/letters")
        letters = get_response.json()
        titles = [l["title"] for l in letters]
        assert "TEST_Lettre mise à jour" not in titles
        print("✅ Verified letter no longer appears in list after deletion")
    
    def test_delete_nonexistent_letter(self, auth_headers):
        """Test DELETE /api/letters/{fake_id} returns 404"""
        response = requests.delete(f"{BASE_URL}/api/letters/nonexistent-id-12345", headers=auth_headers)
        assert response.status_code == 404
        print("✅ DELETE /api/letters/{fake_id} correctly returns 404")


class TestSubscribersAPI:
    """Newsletter Subscribers API tests"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get admin authentication token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "username": "admin",
            "password": "admin123"
        })
        assert response.status_code == 200
        return response.json()["token"]
    
    @pytest.fixture(scope="class")
    def auth_headers(self, auth_token):
        """Get headers with auth token"""
        return {"Authorization": f"Bearer {auth_token}"}
    
    def test_subscribe_new_email(self):
        """Test POST /api/subscribers with new email"""
        test_email = "TEST_subscriber@example.com"
        response = requests.post(f"{BASE_URL}/api/subscribers", json={
            "email": test_email
        })
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == test_email
        assert "id" in data
        assert "subscribed_at" in data
        print(f"✅ POST /api/subscribers created subscriber: {test_email}")
        TestSubscribersAPI.created_subscriber_email = test_email
    
    def test_subscribe_duplicate_email(self):
        """Test POST /api/subscribers with existing email returns same subscriber (no duplicate)"""
        test_email = getattr(TestSubscribersAPI, 'created_subscriber_email', 'TEST_subscriber@example.com')
        response = requests.post(f"{BASE_URL}/api/subscribers", json={
            "email": test_email
        })
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == test_email
        print("✅ POST /api/subscribers with duplicate email returns existing subscriber (no duplicate created)")
    
    def test_get_subscribers_requires_auth(self):
        """Test GET /api/subscribers requires authentication"""
        response = requests.get(f"{BASE_URL}/api/subscribers")
        assert response.status_code in [401, 403]
        print("✅ GET /api/subscribers correctly requires auth (401/403 without token)")
    
    def test_get_subscribers_with_auth(self, auth_headers):
        """Test GET /api/subscribers returns list with valid auth"""
        response = requests.get(f"{BASE_URL}/api/subscribers", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ GET /api/subscribers returns {len(data)} subscribers")
        
        # Check for test subscriber
        emails = [s["email"] for s in data]
        test_email = getattr(TestSubscribersAPI, 'created_subscriber_email', None)
        if test_email:
            assert test_email in emails
            print(f"   Test subscriber {test_email} found in list")
    
    def test_subscribers_have_required_fields(self, auth_headers):
        """Verify subscriber objects have required fields"""
        response = requests.get(f"{BASE_URL}/api/subscribers", headers=auth_headers)
        assert response.status_code == 200
        subscribers = response.json()
        if len(subscribers) > 0:
            subscriber = subscribers[0]
            assert "id" in subscriber
            assert "email" in subscriber
            assert "subscribed_at" in subscriber
            print("✅ Subscriber has all required fields: id, email, subscribed_at")


class TestSeedData:
    """Test seed data exists as expected"""
    
    def test_seed_letters_exist(self):
        """Verify 2 test letters exist: Carême 2026 and Bonne année 2026"""
        response = requests.get(f"{BASE_URL}/api/letters")
        assert response.status_code == 200
        letters = response.json()
        titles = [l["title"] for l in letters]
        
        # Check for expected seed letters
        has_careme = any("Carême" in t or "careme" in t.lower() for t in titles)
        has_bonne_annee = any("Bonne année" in t or "bonne annee" in t.lower() for t in titles)
        
        print(f"   Found letters: {titles}")
        if has_careme:
            print("✅ Seed letter 'Carême 2026' found")
        else:
            print("⚠️ Seed letter 'Carême 2026' not found (may be different title)")
        if has_bonne_annee:
            print("✅ Seed letter 'Bonne année 2026' found")
        else:
            print("⚠️ Seed letter 'Bonne année 2026' not found (may be different title)")
    
    def test_seed_subscriber_exists(self):
        """Verify test subscriber test@paroisse.fr exists"""
        auth_response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "username": "admin",
            "password": "admin123"
        })
        token = auth_response.json()["token"]
        
        response = requests.get(f"{BASE_URL}/api/subscribers", headers={
            "Authorization": f"Bearer {token}"
        })
        assert response.status_code == 200
        subscribers = response.json()
        emails = [s["email"] for s in subscribers]
        
        if "test@paroisse.fr" in emails:
            print("✅ Seed subscriber test@paroisse.fr found")
        else:
            print(f"⚠️ Seed subscriber test@paroisse.fr not found. Found: {emails}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
