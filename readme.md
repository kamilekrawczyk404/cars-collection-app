# 🚀 Proces uruchomienia aplikacji

Poniżej znajdują się instrukcje krok po kroku, jak uruchomić zarówno część frontendową, jak i backendową projektu.

## 🖥️ Frontend

1. Przejdź do katalogu z aplikacją frontendową:

`cd frontend`

2. Zainstaluj wymagane zależności:

`npm install`

3. Uruchom aplikację w trybie deweloperskim:

`npm run start`

4. Po uruchomieniu, w logach konsoli pojawi się link (zazwyczaj `http://localhost:3000`), pod którym dostępna będzie aplikacja.

## ⚙️ Backend

1. Otwórz plik solucji (`.sln`) za pomocą wybranego IDE:

* **Visual Studio**

* **JetBrains Rider**

2. Uruchom projekt (Start/Run).

3. Upewnij się, że serwer nasłuchuje na odpowiednim porcie. Domyślny port dla tego projektu to:

* **Port:** `5105`

* **Adres:** `http://localhost:5105`

### ⚠️ Konfiguracja portów

Jeżeli backend uruchomi się na innym porcie niż `5105`:

1. Skopiuj numer aktualnego portu z konsoli backendu.

2. Otwórz plik konfiguracyjny we frontendzie:
   `frontend/src/features/cars/api.ts`

3. Podmień wartość portu w konfiguracji `BASE_URL` na właściwą.