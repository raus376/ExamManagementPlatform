# ExamManagementPlatform
The Exam Portal is a web application built using Spring Boot for the backend, Angular for the frontend, MySQL for the database, and deployed on AWS. It provides a user-friendly interface for managing exams, ensuring high performance, scalability, and security. AWS enables easy deployment, scalability, and reliability of the application.

<!-- ============================================  AUTHOR ======================================================  -->

Author - **[@Raushan Kumar](https://github.com/raus376)**

![Examify_home](https://github.com/raus376/ExamManagementPlatform/assets/48019264/d9793ade-000f-497c-bbeb-d590ac76260d)


<!-- ============================================  ER - DIAGRAM ======================================================  -->

# ER Diagram

The following Diagram depicts the flow of our Entity Relation Diagram to simplify the work flow.
<br>
<br>
![Examify_ER-Diagram](https://github.com/raus376/ExamManagementPlatform/assets/48019264/9bac5a3c-1f8f-4631-bf8a-70b0c7f6323e)

<br>
<br>

<!-- ============================================  TITLE ======================================================  -->
# Implemented Frontend as well as REST API for Exam Management System

<!-- ============================================  DETAILS ======================================================  -->
## Features

<h2>Admin/Organization Access</h2>
<li>Examify is an innovative platform designed for efficient exam management.</li>
<li>It offers a user-friendly interface and powerful features.</li>
<li>The platform simplifies the entire exam management process, from creating schedules to grading and result management.</li>
<li>Key features of Examify Portal include an Admin Dashboard.</li>
<li>The Admin Dashboard allows administrators to create, update, and delete categories.</li>
<li>Within each category, administrators can add, update, delete, and view quizzes.</li>
<li>Quizzes can be activated as live or disabled.</li>
<li>Administrators can add, delete, and update questions within each quiz.</li>
<li>Administrators can view their profile details.</li>
<li>Overview pages provide a single-page view of all categories and quizzes.</li>
<li>The admin has authorization to access all services in the platform.</li>
<br>
<h2>Participant Access</h2>
<li>Participants can view available quizzes and select one to attempt.</li>
<li>Each quiz has a time limit and maximum marks.</li>
<li>Participants can choose quizzes by scrolling through the dashboard or filtering by categories.</li>
<li>They can view details of a selected quiz, including questions and maximum marks.</li>
<li>Participants can attempt quizzes multiple times.</li>
<li>To attempt a quiz, they start answering questions within the time limit, and the quiz is automatically submitted when time ends.</li>
<li>After attempting a quiz, participants can view their result and it can be saved as a PDF.</li>
<li>They can also review past attempted quizzes and their results.</li>
<li>Participants can view and update their profile details.</li>
<li>General instructions include not refreshing or minimizing the page, completing tasks within the time limit, and following instructions carefully.</li>
<li>Participants should read questions thoroughly, submit answers in the specified format if required, and ask for clarification if needed.</li>
<li>There are no right or wrong answers, and participants should have a positive attitude and enjoy the activity.</li>

 

<!-- ============================================  CONTRIBUTORS ======================================================  -->
## Team Members 👨‍💻
  - **[@Raushan Kumar](https://github.com/raus376)**

<!-- ============================================  TECH STACK ======================================================  -->

## Tech Stack

* Java
* Spring Framework
* Spring Boot
* Spring Data JPA
* Hibernate
* MySQL
* Postman
* Swagger UI
* Angular
* Typescript
* Material-UI
* HTML
* CSS

<!-- ============================================  MODULES ======================================================  -->

## Modules

* Register,Login, Logout Module
* Category Module
* Quiz Module
* Question Module
* Answer Module
* User Module
* Auth Module



<!-- ============================================  DOCUMENTATION ======================================================  -->

```
## Documentation

SWAGGER UI Documentation :- `http://localhost:8888/swagger-ui/`
ExamifyServer Documentation :-`http://35.154.65.143:8888`
ExamifyClient Documentation :-`http://examify.s3-website.ap-south-1.amazonaws.com/`

```
<!-- ============================================  Deployed ======================================================  -->

## Deployed On AWS


<li>The Examify project was deployed on AWS using an EC2 instance, an S3 bucket, and an RDS (Relational Database Service).</li>
<li>The ExamifyServer, which is the backend of the application, was deployed on an S3 bucket.</li>
<li>The ExamifyClient, which is the frontend of the application, was also deployed on an S3 bucket.</li>
<li>An Elastic IP was associated with the EC2 instance, providing a static public IP address.</li>
<li>The Elastic IP was used as the base URL for the ExamifyClient, allowing access to the frontend application.</li>
<li>The EC2 instance hosted the ExamifyServer and served as the backend for handling API requests.</li>
<li>The S3 bucket stored and served the ExamifyServer and ExamifyClient files, ensuring reliable and scalable content delivery.</li>
<li>The RDS was used as the database for the application, storing data such as user profiles, quiz details, and results.</li>



<!-- ============================================  INSTALLATION AND RUN ======================================================  -->

## Installation & Run

* Before running the API server, you should update the database config inside the [application.properties](E-Commerce-Backend\src\main\resources\application.properties) file. 
* Update the port number, username and password as per your local database config.

```
    # On Development mode

    server.port=8888

    spring.datasource.url=jdbc:mysql://localhost:3306/mydb;
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    spring.datasource.username=root
    spring.datasource.password=root

```
```
 # production environment configuration

    spring.datasource.url=jdbc:mysql://examify.cx7ftd0tzrir.ap-south-1.rds.amazonaws.com:3306/examify
    spring.datasource.username=raus376
    spring.datasource.password=*******
    spring.jpa.show-sql=true

```    

<!-- ============================================  API ROOT ENDPOINTS ======================================================  -->

## API Root Endpoint

`http://examify.s3-website.ap-south-1.amazonaws.com/`

