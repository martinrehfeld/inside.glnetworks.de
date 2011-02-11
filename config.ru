require 'rack'
require 'rack/contrib'

module Rack
  # fix missing autoload
  autoload :TryStatic, 'rack/contrib/try_static'
end

use Rack::Deflater
use Rack::ETag

use Rack::ResponseHeaders do |headers|
  headers['Cache-Control'] = 'max-age=3600, public, must-revalidate'
end

use Rack::TryStatic, :root => 'output',  # static files root dir
                     :urls => %w[/],     # match all requests
                     :try => ['.html', 'index.html', '/index.html']

# default endpoint
run Rack::NotFound.new('output/404.html')
