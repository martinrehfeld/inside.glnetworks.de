require 'ninesixty'
require 'fancy-buttons'

project_path = File.dirname(__FILE__)
http_path    = '/'
output_style = :expanded
sass_dir     = 'content/stylesheets'
css_dir      = 'output/stylesheets'
images_dir   = 'output/images'
http_images_path = '/images'
asset_cache_buster do |http_path, real_path|
  if File.exists?(real_path)
    File.mtime(real_path).strftime("%s")
  else
    "v=1"
  end
end
