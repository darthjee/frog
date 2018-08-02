FROM ruby:2.4.0

WORKDIR /home/app/frog
RUN useradd -u 1000 app
RUN chown app.app /home/app
ADD Gemfile* /home/app/frog/

RUN apt-get update && apt-get install -y netcat nodejs-legacy npm
RUN npm install bower -g
RUN gem install bundler
RUN bundle install --clean

USER app
