# server
API for traffic share project

## POST - /register

Registration new user 

### required data 
- name
- username
- password
- email


#### return data
- User

## POST - /login
login existing user will get return token

### required data
- username
- password

### return data
- header : Authorization (token)

## GET - /users
get All user list

### required data
- header : Authorization (token)

## GET - /users/:id
get user by id

### required data 
- id
- header : Authorization (token)

### return data
- User

## PUT - /users/:id
update user

### required data
- id
- header : Authorization (token)

### return data
- Result

## POST - /users/deactivated
deactivated current user

### required data
- id
- header : Authorization (token)

### return data
- result

## POST - /users/activated
activated current user

### required data
- id
- header : Authorization (token)

### return data
- result

## GET - /timelines
get all timeline sorted asc

### required data
- header : Authorization (token)

### return data
- Timelines

## POST - /timelines
create timeline 

### required data
- header : Authorization (token)
- imageUrl
- location
- description

### return data
- result

## GET - /timelines/currentUser
get all timeline current user login

### required data
- header : Authorization (token)

### return data
- Timeline

## PUT - /timelines/:id
update timeline

### required data 
- header : Authorization (token)
### return data
- result

## DELETE - /timelines/:id
delete timeline
### required data 
- header : Authorization (token)
### return data
- result

## Database
- db name : traffic-sharedb
- db user : hacktiv8

- please cek slack to get information about dotenv.
- DB_USER=<cek-slack>
- DB_PASSWORD=<cek-slack>
- SECRET_KEY=<cek-slack> (for jwt verify and sign)