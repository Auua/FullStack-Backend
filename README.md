# FullStack-Backend

Working example
http://fullstack-puhelin.herokuapp.com/


### Before building Docker

To connect MongoDB, add your url to MONGODB_URI in Dockerfile


```bash
docker build -t _NAME_ .
docker run -p 3001:3001 _NAME_
```


### Locally start application

Add MongoDB url to .env file
MONGODB_URI=_YOUR_URL_HERE_

`npm start` opens server to localhost:3001