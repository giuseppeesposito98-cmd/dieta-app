# 🥗 La Mia Dieta — PWA

App per la gestione del piano alimentare settimanale, ottimizzata per iOS e Android.

---

## 📦 Contenuto del pacchetto

```
dieta-app/
├── index.html        ← App principale (tutto in un file)
├── manifest.json     ← Configurazione PWA per installazione
├── sw.js             ← Service Worker (funzionamento offline)
├── icons/
│   ├── icon-192.png  ← Icona per Android / home screen
│   └── icon-512.png  ← Icona splash / store
└── README.md         ← Questa guida
```

---

## 🚀 Come pubblicare (gratis, in 5 minuti)

### Opzione A — Netlify (consigliata, semplicissima)

1. Vai su https://netlify.com e crea un account gratuito
2. Trascina la cartella `dieta-app/` nella pagina di Netlify
3. Netlify pubblica l'app e ti dà un link tipo: `https://mia-dieta.netlify.app`
4. Condividi quel link con tua madre

### Opzione B — GitHub Pages

1. Crea un account su https://github.com
2. Crea un nuovo repository (es. `dieta-app`)
3. Carica tutti i file della cartella `dieta-app/`
4. Vai in Settings → Pages → Branch: main → Save
5. L'app sarà disponibile su: `https://tuonome.github.io/dieta-app`

---

## 📱 Installazione su iPhone (iOS)

1. Apri **Safari** (obbligatorio, non Chrome su iOS)
2. Vai al link dell'app (es. `https://mia-dieta.netlify.app`)
3. Tocca il pulsante **Condividi** (quadrato con freccia in su)
4. Scorri e tocca **"Aggiungi a schermata Home"**
5. Dai un nome all'app e tocca **Aggiungi**

L'app apparirà sulla home come un'app normale, funziona offline!

---

## 📱 Installazione su Android

1. Apri **Chrome** sul telefono
2. Vai al link dell'app
3. Apparirà in basso un banner **"Aggiungi a schermata Home"** — toccalo
4. Oppure: menu (3 punti) → **"Aggiungi a schermata Home"**
5. Conferma e l'app viene installata

---

## 🎤 Integrazione Siri (iPhone)

1. Installa prima l'app sulla home screen (vedi sopra)
2. Apri l'app **Comandi Rapidi**
3. Tocca **+** → **Aggiungi azione** → cerca **"Apri URL"**
4. Inserisci il link della tua app
5. Tocca i 3 punti in alto → **"Aggiungi a Siri"**
6. Registra la frase: _"Cosa mangio oggi?"_
7. Ora puoi chiederlo a Siri anche a schermo bloccato!

---

## 🤖 Integrazione Google Assistant (Android)

1. Installa l'app sulla home screen (vedi sopra)
2. Apri **Google Assistant** → Impostazioni → **Routine**
3. Tocca **+** e imposta:
   - Frase: _"Cosa mangio oggi?"_
   - Azione: **Apri applicazione** → seleziona l'app Dieta
4. Salva la routine

---

## 📤 Come condividere la dieta con un familiare

### Chi invia (tu):
1. Apri l'app → tab **"Condividi"** (in basso)
2. Tocca **"Scarica file dieta (.json)"**
3. Invia il file via WhatsApp, email o AirDrop

### Chi riceve (tua madre):
1. Apri l'app sul suo dispositivo
2. Tab **"Condividi"** → **"Carica file dieta (.json)"**
3. Seleziona il file ricevuto
4. La dieta viene caricata automaticamente!

---

## ✨ Funzionalità

- 📅 Piano giornaliero con 5 pasti (colazione, spuntino, pranzo, merenda, cena)
- 📆 Vista settimana completa
- 📊 Macronutrienti e calorie per ogni pasto e giornata
- ✅ Tracker pasti (segna cosa hai mangiato)
- 📝 Note per ogni pasto (consigli della nutrizionista)
- ➕ Aggiungi / rimuovi alimenti con valori nutrizionali
- 🎤 Assistente vocale (domande in italiano)
- 📤 Esporta dieta in file .json
- 📂 Importa dieta da file .json
- 🌙 Tema chiaro/scuro automatico
- 📴 Funziona offline (service worker)
- 📱 Installabile su home screen iOS e Android

---

## 📞 Supporto

Per qualsiasi problema, apri l'app e usa la tab **Assistente** per le domande vocali,
o contatta chi ti ha condiviso l'app.
