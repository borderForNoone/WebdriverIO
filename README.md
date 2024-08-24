# WebdriverIO

The TypeScript Node.js WebdriverIO project.

# Preconditions

1. Install Node.js;
2. Clone the repository where the project is stored:
    - `git clone https://github.com/borderForNoone/WebdriverIO`
    - `cd WebdriverIO`
3. Install Dependencies;
    - `npm install`

# Steps to run

Run the command below

```
npm run wdio
```

# Report

The report is generated on the gitHub page: https://borderfornoone.github.io/WebdriverIO/

# CI

Testing runs in GitHub actions and deploys a report on the gitHub page: https://borderfornoone.github.io/WebdriverIO/
the docker image of the project is also created and the container is started

# Dockerfile

You can create a project name locally by launching the docker server and entering the following commands in the project console:
    - `docker build -t your-image-name .`
    - `docker run --rm -it your-image-name`
Push Image to a Docker Registry: Push your image to Docker Hub or another container registry to use it in your pipeline:
    - `docker tag your-image-name your-dockerhub-username/your-image-name`
    - `docker push your-dockerhub-username/your-image-name`
