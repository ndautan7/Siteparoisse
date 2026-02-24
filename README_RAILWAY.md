# Déploiement sur Railway - Notre Dame d'Autan

Ce guide explique comment déployer l'application sur Railway.

## Architecture

L'application est composée de 3 services :
- **Frontend** : Application React (port dynamique via `$PORT`)
- **Backend** : API FastAPI (port dynamique via `$PORT`)
- **Database** : MongoDB (externe ou plugin Railway)

## Prérequis

1. Un compte [Railway](https://railway.app)
2. Une base de données MongoDB (MongoDB Atlas recommandé ou plugin Railway)

## Étapes de déploiement

### 1. Créer un nouveau projet Railway

1. Connectez-vous à Railway
2. Cliquez sur "New Project"
3. Sélectionnez "Deploy from GitHub repo"
4. Connectez votre repository GitHub

### 2. Configurer le service Backend

1. Dans Railway, cliquez sur "Add Service" → "Empty Service"
2. Configurez :
   - **Root Directory** : `/backend`
   - **Variables d'environnement** :
     ```
     MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/dbname
     DB_NAME=notre_dame_autan
     JWT_SECRET=votre-cle-secrete-production
     CORS_ORIGINS=https://votre-frontend.railway.app
     ```

3. Railway détectera automatiquement Python et utilisera le `railway.toml`

### 3. Configurer le service Frontend

1. Ajoutez un autre service "Empty Service"
2. Configurez :
   - **Root Directory** : `/frontend`
   - **Variables d'environnement** :
     ```
     REACT_APP_BACKEND_URL=https://votre-backend.railway.app
     ```

3. Railway détectera automatiquement Node.js et utilisera le `railway.toml`

### 4. Générer les domaines

1. Pour chaque service, allez dans "Settings" → "Networking"
2. Cliquez sur "Generate Domain"
3. Notez les URLs générées

### 5. Mettre à jour les variables CORS

Une fois les domaines générés :
1. Mettez à jour `CORS_ORIGINS` du backend avec l'URL du frontend
2. Mettez à jour `REACT_APP_BACKEND_URL` du frontend avec l'URL du backend

## Configuration MongoDB Atlas

Si vous utilisez MongoDB Atlas :

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créez un cluster gratuit (M0)
3. Dans "Database Access", créez un utilisateur
4. Dans "Network Access", ajoutez `0.0.0.0/0` pour autoriser toutes les IPs
5. Obtenez l'URI de connexion dans "Connect" → "Connect your application"

## Structure des fichiers Railway

```
/app
├── railway.json           # Config racine (optionnelle)
├── backend/
│   ├── railway.toml       # Config Railway backend
│   ├── Procfile           # Alternative Heroku-compatible
│   ├── requirements.txt   # Dépendances Python
│   └── server.py          # Application FastAPI
└── frontend/
    ├── railway.toml       # Config Railway frontend
    ├── Procfile           # Alternative Heroku-compatible
    └── package.json       # Dépendances Node.js
```

## Variables d'environnement requises

### Backend
| Variable | Description | Exemple |
|----------|-------------|---------|
| `MONGO_URL` | URI MongoDB | `mongodb+srv://...` |
| `DB_NAME` | Nom de la BDD | `notre_dame_autan` |
| `JWT_SECRET` | Clé secrète JWT | `votre-cle-secrete` |
| `CORS_ORIGINS` | URLs autorisées | `https://frontend.railway.app` |

### Frontend
| Variable | Description | Exemple |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | URL du backend | `https://backend.railway.app` |

## Commandes de déploiement manuel

Si vous préférez utiliser le CLI Railway :

```bash
# Installation du CLI
npm install -g @railway/cli

# Connexion
railway login

# Initialisation du projet
railway init

# Déploiement
railway up
```

## Dépannage

### Le frontend ne se connecte pas au backend
- Vérifiez que `REACT_APP_BACKEND_URL` est correct
- Vérifiez que `CORS_ORIGINS` inclut l'URL du frontend

### Erreur de connexion MongoDB
- Vérifiez l'URI `MONGO_URL`
- Assurez-vous que votre IP est autorisée dans MongoDB Atlas

### Le service ne démarre pas
- Consultez les logs dans Railway
- Vérifiez que toutes les variables d'environnement sont définies

## Support

Pour toute question, consultez :
- [Documentation Railway](https://docs.railway.app)
- [Documentation MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
