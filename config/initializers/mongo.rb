#MONGOHQ_URL = 'mongodb://heroku:00832683bc23a9c01d90d08d7f456333@paulo.mongohq.com:10067/app19812522'
#MONGOHQ_URL = ENV['MONGOHQ_URL'] if ENV.has_key? 'MONGOHQ_URL'
#MONGOHQ_URL = 'mongodb://user:password@localhost:27017/frog-development'
  
settings = if ENV.has_key? 'MONGOHQ_URL'
  MONGOHQ_URL = ENV['MONGOHQ_URL']
  {
    'user' => MONGOHQ_URL.gsub(%r{^mongodb://([^:]*):.*$},"\\1"),
    'pass' => MONGOHQ_URL.gsub(%r{^mongodb://[^:]*:([^@]*).*$},"\\1"),
    'host' => MONGOHQ_URL.gsub(%r{^mongodb://[^@]*@([^:]*):.*$},"\\1"),
    'port' => MONGOHQ_URL.gsub(%r{^mongodb://.*@[^:]*:([^/]*).*$},"\\1"),
    'database' => MONGOHQ_URL.gsub(%r{^mongodb://.*@[^:]*:[^/]*\/(.*)$},"\\1")
  }
else
  YAML.load(File.read(File.expand_path('../../config/mongo.yml', File.dirname(__FILE__))))["#{Rails.env}"]
end

Rails.logger.info "using #{settings}"

MongoMapper.connection = Mongo::Connection.new(settings['host'], settings['port'])
MongoMapper.database = settings['database']

if defined?(PhusionPassenger)
  PhusionPassenger.on_event(:starting_worker_process) do |forked|
    MongoMapper.connection.connect if forked
  end
end
