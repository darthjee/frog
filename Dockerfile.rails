FROM darthjee/taa:0.0.3

WORKDIR /home/app/app/
ADD Gemfile* /home/app/app/

RUN npm install bower -g
RUN gem install bundler
RUN bundle install --clean

USER app
