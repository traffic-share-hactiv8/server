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
- token

## GET - /users
get All user list

### required data
- header : token

## GET - /users/:id
get user by id

### required data 
- id
- header : token

### return data
- User

## PUT - /users/:id
update user

### required data
- id
- header : token

### return data
- Result

## POST - /users/deactivated/:id
deactivated current user

### required data
- id
- header : token

##return data
- result

## POST - /users/activated
activated current user

### required data
- id
- header : token

##return data
- result

## Database
- db name : traffic-sharedb
- db user : hacktiv8

- please cek slack to get information about dotenv.
- DB_USER=<cek-slack>
- DB_PASSWORD=<cek-slack>
- SECRET_KEY=<cek-slack> (for jwt verify and sign)