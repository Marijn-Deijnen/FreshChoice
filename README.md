# FreshChoice

Dit project bestaat uit een React frontend en een Express backend.

## Vereisten

- [Node.js](https://nodejs.org/) (versie 18 of hoger aanbevolen)
- npm (wordt automatisch geïnstalleerd met Node.js)

## Installatie

Nadat je Node.js hebt geïnstalleerd, moet je de dependencies installeren voor zowel de frontend als de backend:

```sh
# Installeer frontend dependencies
cd frontend
npm install

# Installeer backend dependencies
cd ../backend
npm install
```

## Development Tools

Zowel de frontend als backend gebruiken ESLint en Prettier als linter en formatter. Beide zijn het beste te gebruiken via de VSCode extensions:

- ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

## Frontend

De frontend is gebouwd met React en Vite. Navigeer naar de `frontend` folder om de volgende scripts uit te voeren:

### Beschikbare scripts

```sh
# Development server starten
npm run dev

# Production build maken
npm run build
```

**Let op:** `npm run build` bouwt de frontend en kopieert automatisch de gegenereerde `dist` folder naar de [backend](backend) folder via het [scripts/copyDist.js](frontend/scripts/copyDist.js) script. Hierdoor kan de backend meteen de geüpdatete frontend serveren.

## Backend

De backend is gebouwd met Express en serveert de frontend vanuit de `dist` folder. Navigeer naar de `backend` folder om de volgende scripts uit te voeren:

### Beschikbare scripts

```sh
# Development server starten (met hot-reload en debugger)
npm run dev

# Production server starten
npm start
```

## Workflow

1. Zorg dat je `npm install` hebt uitgevoerd in zowel de [frontend](frontend) als [backend](backend) folder
2. Maak wijzigingen in de [frontend](frontend) folder
3. Test lokaal met `npm run dev` in de frontend folder
4. Build de frontend met `npm run build` (dit kopieert automatisch naar backend)
5. Start de backend met `npm run dev` of `npm start` in de backend folder
