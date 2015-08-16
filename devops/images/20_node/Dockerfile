FROM node:0.12.2
MAINTAINER Jim Arnell <jim@arnellconsulting.com>

ENV APP_PATH /opt/app
ENV NODE_ENV production
ENV MONGOHQ_URL mongodb://mongodb:27017/worktajm

# Install global tools
RUN npm install -g grunt-cli
RUN npm install -g bower
RUN npm install -g tsd

# Install Gem
RUN apt-get update && apt-get install -y \
	ruby-full \
	rubygems-integration 
RUN gem install compass

RUN mkdir -p /opt/app
COPY dist /opt/app
COPY node_modules /opt/app/node_modules
WORKDIR /opt/app

# Starting node server on port 8080, make it configurable
CMD ["npm", "start"]
