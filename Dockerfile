# Use a Node.js base image
FROM node:18-slim

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files into the container
COPY . .

# Install necessary browsers and dependencies for WebdriverIO
RUN apt-get update && \
    apt-get install -y curl unzip && \
    curl -sSL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o chrome.deb && \
    apt-get install -y ./chrome.deb && \
    rm chrome.deb

# Expose port (if necessary)
EXPOSE 4444

# Set command to run tests
CMD ["npx", "wdio", "run", "wdio.conf.js"]
