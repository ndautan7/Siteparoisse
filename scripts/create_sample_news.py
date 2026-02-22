#!/usr/bin/env python3
"""
Script pour créer 6 actualités d'exemple pour la paroisse Notre Dame d'Autan
"""

import os
import sys
import asyncio
from datetime import datetime, timezone, timedelta
import uuid
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path

# Ajouter le répertoire backend au path
sys.path.insert(0, str(Path(__file__).parent.parent / 'backend'))

# Configuration MongoDB
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'notre_dame_autan')

async def create_sample_news():
    """Créer 6 actualités d'exemple"""
    
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Actualités à créer
    news_data = [
        {
            "title": "Célébrations de Noël 2025",
            "content": "Venez célébrer la joie de Noël avec notre communauté ! Messe de minuit le 24 décembre à 22h à l'église de Castanet-Tolosan, suivie d'un temps de partage convivial. Messe du jour de Noël à 10h30 dans toutes nos églises.",
            "category": "Liturgie",
            "image_url": "https://customer-assets.emergentagent.com/job_c3efae68-56d0-4924-8ecf-4f7502ce3630/artifacts/54f2vm3r_Eglise-Castanet-Tolosan.jpg",
            "published": True,
            "created_at": (datetime.now(timezone.utc) - timedelta(days=2)).isoformat()
        },
        {
            "title": "Inscriptions au catéchisme pour septembre",
            "content": "Les inscriptions pour le catéchisme 2025-2026 sont ouvertes ! Pour les enfants du CE2 à la 6ème. Réunion d'information le 15 juin à 14h à la salle paroissiale. Contactez le secrétariat pour plus d'informations.",
            "category": "Jeunesse",
            "image_url": "https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/mjvy6496_Familles-jeunesse.png",
            "published": True,
            "created_at": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat()
        },
        {
            "title": "Journée de préparation au baptême",
            "content": "Pour les parents qui souhaitent faire baptiser leur enfant, une journée de préparation sera organisée le samedi 20 juillet de 9h à 16h. Moment de partage, de réflexion et de prière pour accueillir ce merveilleux sacrement.",
            "category": "Sacrements",
            "image_url": "https://customer-assets.emergentagent.com/job_c9a89358-b983-4f0b-8ec4-b48d0db621c4/artifacts/gj75c74d_Bapteme.png",
            "published": True,
            "created_at": (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
        },
        {
            "title": "Première communion : belle célébration !",
            "content": "25 enfants ont reçu pour la première fois le Corps du Christ dimanche dernier. Une célébration empreinte de joie et de recueillement, entourés de leurs familles et de toute la communauté. Que le Seigneur les accompagne sur leur chemin de foi.",
            "category": "Sacrements",
            "image_url": "https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/qqm1rjkh_Premiere-communion.png",
            "published": True,
            "created_at": (datetime.now(timezone.utc) - timedelta(days=10)).isoformat()
        },
        {
            "title": "Collecte pour le Secours Catholique",
            "content": "Grande collecte de denrées alimentaires et de produits d'hygiène le weekend prochain après toutes les messes. Votre générosité permettra d'aider les familles en difficulté de notre secteur. Des bénévoles seront présents pour recevoir vos dons.",
            "category": "Solidarité",
            "image_url": "https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/rz1a62v8_Solidarite.png",
            "published": True,
            "created_at": (datetime.now(timezone.utc) - timedelta(days=12)).isoformat()
        },
        {
            "title": "Veillée de Confirmation des jeunes",
            "content": "12 jeunes de notre paroisse recevront le sacrement de Confirmation lors d'une belle veillée présidée par Monseigneur l'Évêque le samedi 8 juin à 18h. Venez nombreux les entourer de votre prière et de votre présence fraternelle.",
            "category": "Sacrements",
            "image_url": "https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/e13l6wpl_Confirmation.png",
            "published": True,
            "created_at": (datetime.now(timezone.utc) - timedelta(days=15)).isoformat()
        }
    ]
    
    # Supprimer les anciennes actualités (optionnel)
    await db.news.delete_many({})
    print("✓ Anciennes actualités supprimées")
    
    # Insérer les nouvelles actualités
    for news in news_data:
        news['id'] = str(uuid.uuid4())
        await db.news.insert_one(news)
        print(f"✓ Actualité créée : {news['title']}")
    
    print(f"\n✅ {len(news_data)} actualités créées avec succès!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(create_sample_news())
