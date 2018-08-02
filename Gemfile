source 'https://rubygems.org'

ruby '2.4.0'
gem 'rails', '~> 4.1.4'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem "mongo_mapper", '~> 0.13.0'
gem "bson_ext"
gem 'execjs'
gem 'therubyracer'

group :development, :test do
  gem 'webmock'
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails', '~> 4.0.4'
  gem 'coffee-rails'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier'
end

gem 'jquery-rails'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'debugger'

group :test do
  gem 'simplecov'
end

group :development, :test do
  gem 'rspec-rails'
end

group :development do
  gem 'rubycritic'
  gem 'rubocop', require: false
  gem 'pry-rails'
end
