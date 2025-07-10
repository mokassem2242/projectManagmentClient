تجاوز إلى المحتوى
سجل الدردشة

أنت قلت:

Create a web application using ASP.NET Core to manage projects with user authentication and task tracking.
To create a harder task for a candidate.NET, we will further complicate the task by adding advanced requirements such as Layered Architecture, handling asynchronous processes, adding Authentication, and writing mandatory unit tests. The assignment will remain realistic and can be completed in 2-3 hours for a candidate with moderate to advanced experience.
Task: Create a web application using ASP.NET Core to manage projects with user authentication and task tracking.
Task description:
Create a web application using ASP.NET Core that allows registered users to manage projects and associated tasks. The application must contain:
Authentication system: New user registration and login using JWT (JSON Web Token).
Project Management:
Create a new project (containing a name and description).
Retrieve the list of projects for the registered user only.
Update or delete a project.
Task Management:
An important addition to a specific project (containing title, description, due date, and completion status).
Retrieve tasks specific to a specific project.
Update or delete a task.
Unit tests: Write unit tests to cover at least the processes of creating a project and adding tasks.
Technical requirements:
Use ASP.NET Core (latest available version) with MVC or Minimal APIs With Any Framework From JavaScript.
Use a database SQL Server with Entity Framework Core.
Add authentication using JWT to secure endpoints.
Use async/await for all operations with the database.
Write clean code with appropriate annotations and design pattern.





i wan this a md formate 
قال ChatGPT:
# .NET Candidate Assignment

Overview
Design and implement a web application using ASP.NET Core that enables registered users to manage their projects and related tasks. The solution should follow a layered architecture, leverage async database operations, secure endpoints with JWT-based authentication, and include unit tests for core business processes.

Functional Requirements
1. Authentication
User Registration

Endpoint to register with email / username and password.

Passwords must be hashed and stored securely.

User Login

Endpoint to authenticate and issue a JWT.

JWT must include user identifier and expire after a reasonable period (e.g. 1 hour).

Secure Endpoints

All project- and task-related APIs require a valid JWT.

Return HTTP 401 Unauthorized for invalid or missing tokens.

2. Project Management
Create Project

Properties: Name (string), Description (string).

Endpoint: POST /api/projects

List Projects

Return only projects owned by the authenticated user.

Endpoint: GET /api/projects

Update Project

Allow updating Name and Description.

Endpoint: PUT /api/projects/{projectId}

Delete Project

Soft-delete or hard-delete per your design.

Endpoint: DELETE /api/projects/{projectId}

3. Task Management
Add Task to Project

Properties: Title (string), Description (string), DueDate (DateTime), IsCompleted (bool).

Endpoint: POST /api/projects/{projectId}/tasks

List Tasks for Project

Return tasks associated with the specified project (only if the user owns that project).

Endpoint: GET /api/projects/{projectId}/tasks

Update Task

Allow updating any of its properties.

Endpoint: PUT /api/projects/{projectId}/tasks/{taskId}

Delete Task

Endpoint: DELETE /api/projects/{projectId}/tasks/{taskId}

Technical Requirements
Framework & Language

ASP.NET Core (latest LTS or current stable).

C# with either MVC Controllers or Minimal APIs.

Architecture

Layered:

Presentation (Controllers / Endpoints)

Application / Services

Domain / Models

Infrastructure (EF Core, Repositories)

Use Dependency Injection throughout.

Data Access

SQL Server with Entity Framework Core.

All database calls must use async/await.

Authentication

JWT bearer tokens (e.g. via Microsoft.AspNetCore.Authentication.JwtBearer).

Secure all non-public routes.

Frontend

Any JavaScript framework (e.g., React, Angular, Vue) or plain HTML/JS.

Basic UI to:

Register / Login

CRUD projects

CRUD tasks within a project

Unit Testing

Use xUnit, NUnit, or MSTest.

Cover at least:

ProjectService.CreateProjectAsync

TaskService.AddTaskToProjectAsync

Mock EF Core or use the InMemory provider.

Deliverables
A Git repository containing:

Source code for backend and frontend.

A README with setup and run instructions.

Database migration scripts or EF Migrations.

Unit test project with tests passing.

Evaluation Criteria
Correctness and completeness of features.

Proper use of async/await and error handling.

Clean, maintainable code; separation of concerns.

Security of authentication and authorization.

Quality and coverage of unit tests.

Clarity of documentation and ease of setup.

Time Estimate: 2–3 hours for a moderately experienced .NET developer. Good luck!




No file chosenNo file chosen
يمكن أن تصدر عن ChatGPT بعض الأخطاء. لذلك يجب التحقق من المعلومات المهمة.
