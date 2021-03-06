# Task 1 - Police case

The police need an application to better handle their cases.

Make an application for the police to handle cases. They need to be able to register, delete, edit and display cases.

There will be need of different types of information about a case, and in addition it is of interest to be able to mark a case as "Solved", when this applies. It is up to you to think of what else will be needed!

A police officer/detective may want to use the application both in the field and in the office; but maybe with different types of use. In the field the police officers may want to be able to get important information about place, persons etc. to help them in the case.

A case may for example be a robbery, assault, traffic incidence etc.

### Criteria for assessment

- Good use of technologies mentioned in the Comments field above
- Note In regard to Bootstrap!: It is enough to make the solution work only on larger screens as the focus in this assignment primarily is on React and Web API!
- Structure, name giving of functions/methods, variables etc.
- Commenting of code (you are delivering "under development code")
- The Web API solution should make use of all 4 CRUD operations:
  - (C) Save something to the XML database
  - (R) Get information from the XML database
    - One unit of information by ID or another attribute
    - All
  - (U) Update something in the XML database
  - (D) Delete something from the XML database
- Amount of functionality
- Complexity of functionality
- Working solution

## How to run

The project uses docker to run. Make sure you have docker installed.

run:

```
docker-compose up --build -V
```

Then the site will be available on [localhost](http://localhost:3050/)

**NB** If you want to run without docker you can change the .env file to target the C# Api through localhost. Change the url from /api to localhost:((PORT))/api followed by building the project and everything should work.

### Project structure

The project is using the components to build the whole application. The application uses:

- `/api` as the api integration of the backend
- `/nginx` for routing request between frontend and backend
- `/client` as the client side (frontend)
