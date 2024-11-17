# fantastic-tribble 😎

## About the Project 🥰
This is a web application designed to streamline and automate work processes. The platform enables users to organize tasks, and collaborate effectively within companies.

## About Us 🚂
https://github.com/amasyaska Bohdan Kolesnikov | Team Lead / backend \
https://github.com/GineTik Denis Shevchuk | Frontend / DevOps \
https://github.com/MariiaMazur Mariia Mazur | Design / frontend \
https://github.com/vla-decr000 Vladyslav | Tech lead / database developer

## Features 🏵️
***Create and Manage Groups or Companies:***  
Users can establish companies or groups and add others to join.  
***Project Management:***  
Create and organize projects.  
***Task Tracking:***  
Users can add tasks to ongoing projects. Other team members can view, execute, and monitor these tasks to ensure efficient collaboration.  

## Implementation 💻
***frontend:*** React.js, TypeScript  
***backend:*** Django, Django REST framework, JWT Authentication  

## How to run the project 🧰
Read the README.md file in the `src/` directory

## RESTful API 🦝
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
- /api/v1/project/{project_id}/task/
   - POST | creates task
- /api/v1/project/{project_id}/task/{task_id}
   - GET | returns task info
   - DELETE | deletes task \
- /api/v1/project/{project_id}/task/{task_id}/workers/
   - GET | returns task workers info
   - POST | adds worker to task \
- /api/v1/project/{project_id}/task/{task_id}/workers/{worker_id}
   - DELETE | deletes task worker

## security :
https implementation is in ```nginx-https-setup``` branch
copy your SSL certificate and key to nginx-container and name them "cert.crt" and "cert.key"

