from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Quote Request Model
class QuoteRequestCreate(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    service_type: str
    message: Optional[str] = None
    address: Optional[str] = None

class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    service_type: str
    message: Optional[str] = None
    address: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Review Model
class ReviewCreate(BaseModel):
    name: str
    rating: int = Field(ge=1, le=5)
    comment: str
    service_type: Optional[str] = None

class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    rating: int
    comment: str
    service_type: Optional[str] = None
    is_approved: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Routes
@api_router.get("/")
async def root():
    return {"message": "MK Renk & Tasarım API - Boya, Badana, Tamirat Hizmetleri"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Quote Request Routes
@api_router.post("/quotes", response_model=QuoteRequest)
async def create_quote_request(input: QuoteRequestCreate):
    quote_dict = input.model_dump()
    quote_obj = QuoteRequest(**quote_dict)
    
    doc = quote_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.quote_requests.insert_one(doc)
    return quote_obj

@api_router.get("/quotes", response_model=List[QuoteRequest])
async def get_quote_requests():
    quotes = await db.quote_requests.find({}, {"_id": 0}).to_list(1000)
    
    for quote in quotes:
        if isinstance(quote.get('created_at'), str):
            quote['created_at'] = datetime.fromisoformat(quote['created_at'])
    
    return quotes

@api_router.get("/quotes/{quote_id}", response_model=QuoteRequest)
async def get_quote_request(quote_id: str):
    quote = await db.quote_requests.find_one({"id": quote_id}, {"_id": 0})
    if not quote:
        raise HTTPException(status_code=404, detail="Quote request not found")
    
    if isinstance(quote.get('created_at'), str):
        quote['created_at'] = datetime.fromisoformat(quote['created_at'])
    
    return quote

# Review Routes
@api_router.post("/reviews", response_model=Review)
async def create_review(input: ReviewCreate):
    review_dict = input.model_dump()
    review_obj = Review(**review_dict)
    
    doc = review_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.reviews.insert_one(doc)
    return review_obj

@api_router.get("/reviews", response_model=List[Review])
async def get_reviews(approved_only: bool = True):
    query = {"is_approved": True} if approved_only else {}
    reviews = await db.reviews.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    for review in reviews:
        if isinstance(review.get('created_at'), str):
            review['created_at'] = datetime.fromisoformat(review['created_at'])
    
    return reviews

@api_router.get("/reviews/all", response_model=List[Review])
async def get_all_reviews():
    reviews = await db.reviews.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    for review in reviews:
        if isinstance(review.get('created_at'), str):
            review['created_at'] = datetime.fromisoformat(review['created_at'])
    
    return reviews

@api_router.patch("/reviews/{review_id}/approve")
async def approve_review(review_id: str):
    result = await db.reviews.update_one(
        {"id": review_id},
        {"$set": {"is_approved": True}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    return {"message": "Review approved successfully"}

@api_router.delete("/reviews/{review_id}")
async def delete_review(review_id: str):
    result = await db.reviews.delete_one({"id": review_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    return {"message": "Review deleted successfully"}

# Price Calculator
@api_router.get("/prices")
async def get_prices():
    return {
        "services": {
            "ic-mekan-boya": {"name": "İç Mekan Boya", "price_per_sqm": 85, "unit": "₺/m²"},
            "badana": {"name": "Badana", "price_per_sqm": 45, "unit": "₺/m²"},
            "tadilat": {"name": "Tadilat", "price_per_sqm": 150, "unit": "₺/m²"},
            "tamirat": {"name": "Tamirat", "price_per_sqm": 120, "unit": "₺/m²"},
        },
        "note": "Fiyatlar tahmini olup, kesin fiyat için yerinde keşif gerekmektedir."
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
