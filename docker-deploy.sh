#!/bin/sh

REMOTE='ubuntu@ec2-54-226-107-157.compute-1.amazonaws.com'
DOCKER_COMPOSE='docker-compose.yml'
ENV_FILE='./.env'
NGINX_CONF='./configurations'

if [ "$1" != "" ]; then
	DEFAULT_PEM_PATH=$1
else
	DEFAULT_PEM_PATH='testnode.pem'
fi

echo $DEFAULT_PEM_PATH
echo "Pushing the docker-compose.yml on server"

# push the single compose file
scp -i $DEFAULT_PEM_PATH $DOCKER_COMPOSE $REMOTE:~/

echo "Pushing the environment files to server"
scp -i $DEFAULT_PEM_PATH $ENV_FILE $REMOTE:~/
# scp -i $DEFAULT_PEM_PATH $ENV_PROD $REMOTE:~/

echo "Push the nginx configurations"
scp -r -i $DEFAULT_PEM_PATH $NGINX_CONF $REMOTE:~/

# push the environment file
#scp -i "/Users/gaurav/Documents/dev/litnite-project/ssh/litnite-keypair.pem" env-production ubuntu@ec2-18-220-236-151.us-east-2.compute.amazonaws.com:~/

# run the docker-compose up command to run the docker apps
ssh -i $DEFAULT_PEM_PATH $REMOTE "sudo docker-compose pull"
ssh -i $DEFAULT_PEM_PATH $REMOTE "sudo docker-compose down"
ssh -i $DEFAULT_PEM_PATH $REMOTE "sudo docker-compose -f docker-compose.yml up -d --force-recreate --remove-orphans"

echo "Success pushing the docker compose files to aws server."