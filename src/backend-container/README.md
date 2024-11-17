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
- /api/v1/accounts/user/
   - POST | create user \
     in: {"username"\*, "password"\*, "password2"\*, "first_name"\*, "last_name"\*, "email"\*} \
     out: {"message": *message*}
- /api/v1/accounts/user/{id}
   - GET | gives user info \
     in: {} \
     out: {"id": *id*, "username": *username*, "first_name": *first_name*, "last_name": *last_name*}
   - DELETE | deletes user if user requests to delete his own (!) account \
     in: {} \
     out: {"message": *message*}
- /api/v1/accounts/login/
   - POST | login user - returns JWT \
     in: {"username"\*, "password"\*} \
     out: {"access_token": *access_token*, "refresh_token": *refresh_token*, ...}
- /api/v1/company/
   - POST | creates company from current user \
     in: {"name"\*, "description"\*, "creator"\* (creator_id)} \
     out: {"message": *message*, "company_data": *company_data*}
- /api/v1/company/{id}
   - GET | gives company info \
     in: {} \
     out: {"id": *id*, "name": *name*, "description": *description*}
   - DELETE | deletes company if user requests to delete his own (!) company \
     in: {} \
     out: {"message": *message*}
- /api/v1/company/{id}/members/
   - GET | gives company members \
   - POST | adds company member
- /api/v1/company/{company_id}/members/{member_id}
   - DELETE | gives company members \
- /api/v1/project/
   - POST | creates project
- /api/v1/project/{project_id}
   - GET | returns project info
   - DELETE | deletes project \
