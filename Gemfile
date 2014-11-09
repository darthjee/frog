source 'https://rubygems.org'

gem 'rails', '3.2.12'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem "mongo_mapper", '~> 0.13.0'
gem "bson_ext"
gem 'execjs'
gem 'therubyracer'

group :development, :test do
  gem 'debugger'
  gem 'webmock'
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
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
  gem 'simplecov', '~> 0.9.1'
end

group :development, :test do
  gem 'rspec-rails', '~> 3.0.0'
end

group :development do
  gem 'rubycritic', '~> 1.1.1'
  gem 'rubocop', '~> 0.23.0', require: false
  gem 'pry-rails'
end
