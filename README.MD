# Interview Pprep

The interview-prep app allows you to practice common interview questions and record your responses to them. You can then review your responses to see if you'd like to improve them before your next interview.

## Demo

- [Live Demo](https://interview-prep-capstone.herokuapp.com/)

## Motivation

As a job-seeker, I wanted to build another way to practice interview questions, but I also wanted to be able to review my answers later to see how they could be improved.

## Requirements

* Do something interesting or useful
* Be a fullstack app using HTML, CSS, Node, Express, and Mongoose
* Server must server all static files and implement all four CRUD operations
* Server-side code should be tested comprehensively and use TravisCI for continuous integration and deployment.
* App should be responsive, and should work just as well on mobile devices as it does on desktop devices.
* Code should be high quality, error free, commented as necessary, and clean.
* Styling on the client should be polished.
* Use vanilla CSS for styling capstones. Frameworks like Bootstrap are not permitted. 
* Have a comprehensive README file.
* Have a landing page that explains what the app does and how to get started, and the pages required to deliver functionality.
* Deploy a live, publicly-accessible version of the app.
* A demo user account and indicate on the landing page how to use it.

## Built With

Interview-Prep was bulit with:

### Front End

* HTML5
* CSS3
* JavaScript 
* jQuery 

### Back End 

* Node.js 
* Express.js
* MongoDB
* Mongoose
* mLab database
* Mocha
* Chai

### DevOps
* Heroku
* TravisCI
* mLab


### Responsive
This app is built to be responsive to smaller screen sizes using a float-grid css and media screen width breakpoint of 640px for smaller screen sizes

## Screenshots

**Landing Page**

**Story:** As a user, I want to understand what the app is so that I can decide if I want to sign up

![Logged Out Landing page design](/public/images/Logged_out_home_page.png)

**Sign Up Page**

**Story:** As a user, I want to sign up so I can save the interviews I complete

![Sign Up page design](/public/images/Sign_up_screen.png)


**Log In Page**

**Story:** As a user, I want to log in so I can access my information

![Log In page design](/public/images/Log_in_screen.png)

**Dashboard Page**

**Story:** As a user, I want to see which interviews I've completed, review them, or delete them if I no longer wish to keep them

![Logged In Landing page design](/public/images/Logged_in_homepage.png)

**Question Page**

**Story:** As a user, I want to answer different interview quesitons

![Question page design](/public/images/Question_screen.png)

**Interview Complete Page**

**Story:** As a user, I want to know when the interview is over

![Interview Complete page design](/public/images/Interview_complete.png)

**Review Responses Page**

**Story:** As a user, I want to review my responses

![Response Reivew page design](/public/images/Response_review_screen.png)

**Review Interview Page**

**Story:** As a user, I want to review all of the interviews I've done

![Question page design](/public/images/Review_interview_screen.png)

**Log Out Page**

**Story:** As a user, I want to log out so I can keep my account and information secure

## Using the API

### Authentication / Login
##### POST: /auth/login

* Bearer Authentication with JSON Web Token
* Must provide valid Username and Password in request header
* If authentication succeeds, a valid 7d expiry JWT will be provided in response body

### Authentication / JWT Refresh
##### POST: /auth/refresh

* Bearer Authentication with JSON Web Token
* If authentication succeeds, a new valid 7d expiry JWT will be provided in response body

### Register and Login New User
##### POST: /users 

* Must provide Username and Password in request body
* If successful, a valid 7d expiry JWT will be provided in response body

### Delete a User
##### DELETE: /users/:id 

* Must provide Username in request body and user id in parameter
* Bearer Authentication with JSON Web Token
* If successful, user will be removed from database, Users collection

### Change Password
##### PUT: /users/:id 

* Must provide current password in request body and user id in parameter
* Bearer Authentication with JSON Web Token
* If successful, "Password changed successfully" message in response body

### Get Interview Questions
##### GET: /questions 

* Returns up to 100 interview questions
* Questions are publicly available, no authentication required

### Get Interviews
##### GET: /interviews

* Returns all interviews for a given user from the database Interviews collection
* Bearer Authentication with JSON Web Token

### Update One Interview
##### PUT: /interviews/:interviewId

* Updates an interview for a given user from the database Interviews collection
* Bearer Authentication with JSON Web Token
* Must provide the index of the response to update and the edited response in the request body in addition to interview id in parameters
* Returns a success message and the updated

### Create Interview
##### POST: /interviews

* Creates and returns an interview for a given user in the database Interviews collection
* Bearer Authentication with JSON Web Token
* Must provide an object with a key of responses that has an array for a value

### Delete Interview
##### DELETE: /interviews/:interviewId

* Removes an interview for a given user in the database Interviews collection
* Bearer Authentication with JSON Web Token
* Must provide the interview id in the parameters
* Returns success message

## Development Road Map
Features for future iterations include:
- Add voice recognition to record interview responses
- Add timer feature to answering interview questions
- Add feature to allow users to add their own questions
- Add advice for each question to help users
- Add links to interview resources
- Add feedback from others feature on interview responses
- Add industry specific interview questions
- Add filter to which interview questions will be displayed
- Add change password feature
- Add delete user feature
