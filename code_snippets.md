## Frequently Used Code Snippets


### connect to local DB
```
sudo service postgresql start
sudo -u postgres psql
\password
# change password to 'postgres'
sequelize db:create
npm start
```

#### mac users
```
psql postgres
ALTER USER postgres CREATEDB
\du # check new permission
sequelize db:create
```

### kill all processes on port
```
 kill $(lsof -t -i:5000) 
 ```
 
### kill port 
```
npx kill-port 5000
```

### install node and npm
 ```
 sudo apt install nodejs npm
 ```

### RESTful API call with cURL
```
curl -v http://localhost:5000/<endpoint>
```