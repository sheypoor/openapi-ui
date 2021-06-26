# OpenAPI UI

A fully dockerized OpenAPI compatible UI to server both Swagger and ASyncAPI with focus to use on microservice environment. Main features are:

* Being multistage and all 
* Server side access to swagger asset files
* Easy to configure
* Hot reload

To run the service in Docker we can run:
```sh
docker run -p 8080:8080 \
	-e APP_PORT=8080 \
	-e CONFIG_MODE=test \
	-d sdshariati/openapi-ui:latest
```

To run the service in Docker Compose we can simply use the available `docker-compose.yml` file and run:
```shell
docker-compose up -d
```

Environments are as below:
|Name               	|Description
|-----------------------|-------------------------------
|`APP_PORT` | The port that will expose by applocation
|`CONFIG_MODE` | Name of the config we are using based on the config file
