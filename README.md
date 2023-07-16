# Projet analytics

Pour lancer le projet il faut :
- Cloner le projet [`analytics-front`](https://github.com/Fur-Fight-Club/analytics-front), fais un `npm i -f` et lance le projet avec `npm run dev`. Il va tourner sur le port 3000. C'est le backoffice de l'application.
- Le projet [`ffc-analytics-service`](https://github.com/Fur-Fight-Club/ffc-analytics-service) doit être lancé avec `npm run start:dev`. Il va tourner sur le port 4001. C'est le back de l'application en NestJS repris du PA et adapté pour se connecter à MongoDB et Firestore.
- Remplir le fichier `.env` dans le projet `ffc-analytics-service` avec les informations de connexion à la base de données MongoDB dispo sur MyGES:
```json
MONGODB_URL="mettre_ici_mongodb_url"
ISSUER="http://localhost:4001"
```

Pour tester l'application tu peux te connecter avec le compte suivant sur lequel tu as de la data à visualiser (celle du PA) : 

### Compte USER
```JSON
mcamus@condorcet93.fr
ABC123abc
```

### Compte ADMIN
```JSON
admin@example.com
@Test123
```

