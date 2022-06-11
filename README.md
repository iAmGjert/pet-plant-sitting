# thesis
fork to your personal repo then clone that down locally
```
git clone http://github.com/<your username>/<repo name>
git remote add upstream https://github.com/fern-herm/pet-plant-sitting.git
```

# connect to local DB
```
sudo -u postgres psql
\password
# change password to 'postgres'
sequelize db:create
npm start
```
