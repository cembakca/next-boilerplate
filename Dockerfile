FROM node:12.16.1-alpine AS builder
# This is a multi-stage dockerfile.
###### BUILDER STAGE ######
LABEL author="AUTHOR"
LABEL name="NAME"

# Create working directory.
WORKDIR /ui

# Login npm.js to get private dependencies
ARG NPMJS_USERNAME="NPMJS_USERNAME"
ARG NPMJS_PASSWORD="NPMJS_PASSWORD"
ARG NPMJS_EMAIL="NPMJS_EMAIL"
RUN npm i npm-cli-login -g
RUN npm-cli-login -u $NPMJS_USERNAME -p $NPMJS_PASSWORD -e $NPMJS_EMAIL


COPY . /ui/
RUN rm -Rf /ui/node_modules

# Install app dependencies
RUN npm install --production

# Build the app
RUN npm run build

###### RUNNING STAGE ######
FROM node:12.16.1-alpine

# Set working directory
WORKDIR /ui

# Copy files from build stage
COPY --from=builder /ui /ui

# start node instance
CMD [ "node", "server/index.js" ]
