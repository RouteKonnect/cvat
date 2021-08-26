# Route Konnect - Computer Vision Annotation Tool Setup

Here are the steps I took and some notes on hosting cvat on aws lightsail running ubuntu 16

## Dependencies

```
sudo apt update
sudo apt install docker-compose
```

Install Docker

> https://docs.docker.com/engine/install/ubuntu/

> https://docs.docker.com/engine/install/linux-postinstall/

## AWS Credentials

You can skip this step if you don't plan on pulling an image from Amazon Elastic Container Registry (ECR)

Add IAM User Credentials to ~/.aws/credentials

```
[default]
aws_access_key_id = <AWS_ACCESS_KEY_ID>
aws_secret_access_key = <AWS_SECRET_ACCESS_KEY>
region = eu-west-1
```


```
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 012680811047.dkr.ecr.eu-west-1.amazonaws.com
```

## Mounting S3 Bucket

```
sudo mkdir -p /s3/data
sudo apt install s3fs
sudo nano /etc/passwd-s3fs
```
Write: *<AWS_ACCESS_KEY_ID>:<AWS_SECRET_ACCESS_KEY>*

```
sudo chmod 600 /etc/passwd-s3fs
sudo s3fs -o allow_other <bucket-name> /s3/data
```


## Environment Variables

Add to the end of ~/.bashrc
```
export CVAT_HOST=<DOMAIN>
export ACME_EMAIL=<SSL_CERT_EMAIL>
```

## Building

```
docker image pull 012680811047.dkr.ecr.eu-west-1.amazonaws.com/cvat:latest
```

```
docker image tag 012680811047.dkr.ecr.eu-west-1.amazonaws.com/cvat cvat
```

> Note: If any changes were made to cvat_ui remember build locally and push to ecr repository, then pull and update docker-compose.deploy.yml to use the pulled image

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

## Helpful References

> https://openvinotoolkit.github.io/cvat/docs/administration/basics/installation/

> https://hub.docker.com/r/openvino/cvat_server

> https://github.com/openvinotoolkit/cvat/issues/1283

> https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html

> https://www.youtube.com/watch?v=F0Rz1xWKtiI&t=950s