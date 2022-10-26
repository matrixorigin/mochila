# Mochila: Prototype v0.1
- Note as of 10/26/2022: The communication between frontend and backend is currently being designed out, so the prototype cannot connect to any databases yet.
## Purpose
- This prototype is meant to simulate user interaction between the front and backend of Mochila, and help build out/test various individual components.
- The frontend is constructed as a create-react-app
- The backend is hosted locally via Python and Flask
## Getting Started
- There are two processes that must be started locally to run the prototype webpage, which are a React Javascript frontend and a Flask Python server. It is recommended to use virtualenv, anaconda, or another environment manager to contain the dependencies of this prototype.
- Start by cloning the repository locally and entering the prototype project
git clone..
cd ./mochila_proto

1. Setting up the Flask server
- Currently, the prototype communicates to a Flask backend. To set up the backend, ensure that you have Flask installed.
```console
$ pip install flask
```

2. Setting up the React frontend
- Make sure npm is installed
```console
$ npm install -g npm
$ npm -v
$ node -v
```
- Ensure you are in the ./mochila_proto folder, and run 'npm install' to install all dependencies of the user interface
```console
$ npm install
```
3. Starting up the server and web page
- To start the server, navigate into the localserver directory and type 'flask run'
cd your/path/mochila_proto/localserver
```console
flask run
```
- Make sure not to close this terminal, as the server will terminate if it is closed.
- To start the web page, navigate to mochila_proto in a separate terminal and type 'npm start'
cd your/path/mochila_proto
```console
npm start
```
- Again, make sure to not close this terminal
- If the webpage does not open automatically, navigate to 'http://localhost:3000' on your preferred web browser

3. Connecting to a database
- In order to connect to a database, enter the host, port, username, and password on the login screen of the web page
- If the connection is successful, the table below will display the databases available. Select one to enter the main program