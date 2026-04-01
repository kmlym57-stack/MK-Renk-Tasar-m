import requests
import sys
from datetime import datetime

class DekorixAPITester:
    def __init__(self, base_url="https://tamirat-hizmetleri.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.content:
                    try:
                        response_data = response.json()
                        print(f"Response: {response_data}")
                    except:
                        print(f"Response text: {response.text[:200]}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:200]}")

            return success, response.json() if response.content and success else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )

    def test_create_quote_request(self):
        """Test creating a quote request"""
        quote_data = {
            "name": "Test Müşteri",
            "phone": "05551234567",
            "email": "test@example.com",
            "service_type": "ic-mekan-boya",
            "message": "Test mesajı - boya işi için teklif istiyorum",
            "address": "Test Mahallesi, Test Sokak No:1, İstanbul"
        }
        
        success, response = self.run_test(
            "Create Quote Request",
            "POST",
            "quotes",
            200,
            data=quote_data
        )
        return response.get('id') if success else None

    def test_get_quote_requests(self):
        """Test getting all quote requests"""
        return self.run_test(
            "Get Quote Requests",
            "GET",
            "quotes",
            200
        )

    def test_get_quote_by_id(self, quote_id):
        """Test getting a specific quote by ID"""
        if not quote_id:
            print("❌ Skipping quote by ID test - no quote ID available")
            return False
            
        return self.run_test(
            "Get Quote by ID",
            "GET",
            f"quotes/{quote_id}",
            200
        )

    def test_status_endpoint(self):
        """Test status check endpoint"""
        status_data = {
            "client_name": "test_client"
        }
        
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=status_data
        )

    def test_get_status_checks(self):
        """Test getting status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )

def main():
    print("🚀 Starting Dekorix API Tests...")
    print("=" * 50)
    
    # Setup
    tester = DekorixAPITester()

    # Run tests
    print("\n📋 Testing API Endpoints...")
    
    # Test root endpoint
    tester.test_root_endpoint()
    
    # Test status endpoints
    tester.test_status_endpoint()
    tester.test_get_status_checks()
    
    # Test quote endpoints
    quote_id = tester.test_create_quote_request()
    tester.test_get_quote_requests()
    tester.test_get_quote_by_id(quote_id)

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())