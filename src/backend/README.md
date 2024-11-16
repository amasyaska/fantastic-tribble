# backend
Django, Django REST framework, SimpleJWT
# test server locally
1. ```git clone https://github.com/amasyaska/fantastic-tribble```
2. create virtual environment and install requirements.txt
   ```cd fantastic-tribble/src/backend``` \
   ```python -m venv .venv``` \
   Linux: ```source .venv/bin/activate``` \
   Windows: ```.venv\Scripts\activate``` \
   ```pip install requirements.txt```
4. create .env file in src/backend/djangowebserver, add SECRET_KEY and DEBUG
   ```
   SECRET_KEY={your SECRET_KEY here}
   DEBUG={True or False}
   ```
5. ```cd ./djangowebserver```
6. ```python manage.py runserver```
7. send your requests to ```localhost:8000```
# endpoints
\* – required field
- /api/v1/accounts/user
   - POST | create user
     - JSON: {username*, password*, password2*, first_name*, last_name*, email*}
- /api/v1/accounts/login
   - POST | login user - returns JWT in format {"access_token": *access_token*, "refresh_token": *refresh_token*, ...}
      - JSON: {username*, password*}
