#! /bin/bash

: '---- CONSTANTS ----'
COMPOSE_FILE="docker-compose.dev.yaml"
BRANCH="main"
TozaHub=~/TozaHub/backend/payments-svc

set -e

# change path to the ihub working dir
function change_path(){
    cd $TozaHub || exit
    echo "This is the current working dir: $TozaHub"
}

# pull the latest changes from remote url
function pull_latest_changes() {
    echo "Pulling latest changes from the ${BRANCH} branch..."
    git pull origin ${BRANCH}
}

# stop the existing containers
function stop_running_containers() {
    echo "Stopping the running containers ..."

    docker compose -f $COMPOSE_FILE down
    docker image prune -f
    echo "removed the old containers and daggling images ...."
}

function deploy() {
    if [ ! -f "$COMPOSE_FILE" ]; then
        echo -e "Docker Compose file '$COMPOSE_FILE' not found.\n Exiting..."
        exit 1

    else
        # finally deploy the application
        echo "Finally!. Your application is ready for deployment ..."
        docker compose -f ${COMPOSE_FILE} up -d --build
    fi

}

function main() {
    change_path
    pull_latest_changes
    stop_running_containers
    deploy
}

main