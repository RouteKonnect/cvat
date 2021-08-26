# Route Konnect - Computer Vision Annotation Tool Setup

Here are the steps I took and some notes on hosting cvat on lightsail running ubuntu 16

## Dependencies

```
sudo apt update
sudo apt install docker-compose
```

Install Docker
https://docs.docker.com/engine/install/ubuntu/

## Credentials

Add IAM User Credentials to ~/.aws/credentials

```
[default]
aws_access_key_id = adminuser access key ID
aws_secret_access_key = adminuser secret access key
region = eu-west-1
```

```
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 012680811047.dkr.ecr.eu-west-1.amazonaws.com
```

## Environment Variables

Add to the end of ~/.bashrc
```
export CVAT_HOST= server_ip
export ACME_EMAIL= ssl_email
```

## Building

```
docker image pull 012680811047.dkr.ecr.eu-west-1.amazonaws.com/cvat:latest
```

```
docker image tag 012680811047.dkr.ecr.eu-west-1.amazonaws.com/cvat cvat
```

> Note: If any changes were made to cvat_ui remember push and pull cvat_ui, and update docker-compose.deploy.yml

Alternatively you can build cvat and cvat_ui

```
cd cvat
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
```

> Note: 2gb of ram was not enough to build cvat_ui

## Finally
```
docker-compose -f docker-compose.deploy.yml up -d
```

```
docker exec -it cvat bash -ic 'python3 ~/manage.py createsuperuser'
```