# Cloud Mock for Deed It

API and cloudfront fake services for developing the clients

## Installation

```
npm install
```

## Run (in development)

Copy the .env.example file to .env and ensure your .env file has valid values:
```
cp .env.example .env
```

Then:
```
npm start
```

## Usage (GET):

Get a view of the whole database
```
/data
```

Get the latests deeds and events from Wonderwall
```
/wonderwall/latest
```

Get the relevant Wonderwall elements for a user (e.g. Pablo)
```
/wonderwall/user/Pablo
```

Get Wonderwall elements by status (e.g. unapproved)
```
/wonderwall/status/unapproved
```

Get a user profile: user data and events (e.g. Pablo)
```
/user-profile/Pablo
```

Get the deed hierarchy: super-deeds and deed types
```
/deed-hierarchy
```
  
## Usage (POST):

Create a user
```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "username=Jean&country=France" http://localhost:11111/create-user
```

Append extra information to a user
```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "email=mike.evans@gmail.com&agerange=40-50" http://localhost:11111/add-user-info/Mike
```

Remove a user (and its data)
```
curl -X POST http://localhost:11111/remove-user/Mike
```

Assign a deed to a user (instantiate a deed)
```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "username=Jean&deedTypeId=Mugs" http://localhost:11111/create-user-deed
```

Set a deed status (e.g. approve Deed ID AABBCC)
```
curl -X POST  http://localhost:11111/set-deed-status/AABBCC/approve
```

Shortcut for approving a deed (e.g. Deed ID AABBCC)
```
curl -X POST  http://localhost:11111/approve-deed/AABBCC
```
