include Nanoc3::Helpers::Tagging
include Nanoc3::Helpers::Rendering
include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::XMLSitemap
include Nanoc3::Helpers::LinkTo

require 'fileutils'

# Taken from: http://github.com/mgutz/nanoc3_blog/blob/master/lib/helpers.rb
#
# Hyphens are converted to sub-directories in the output folder.
#
# If a file has two extensions like Rails naming conventions, then the first extension
# is used as part of the output file.
#
#   sitemap.xml.erb # => sitemap.xml
#
# If the output file does not end with an .html extension, item[:layout] is set to 'none'
# bypassing the use of layouts.
# 
def route_path(item)
  # in-memory items have not file
  return item.identifier + "index.html" if item[:content_filename].nil?
  
  url = item[:content_filename].gsub(/^content/, '')
 
  # determine output extension
  extname = '.' + item[:extension].split('.').last
  outext = '.haml'
  if url.match(/(\.[a-zA-Z0-9]+){2}$/) # => *.html.erb, *.html.md ...
    outext = '' # remove 2nd extension
  elsif extname == ".sass"
    outext = '.css'
  else
    outext = '.html'
  end
  url.gsub!(extname, outext)
  
  if url.include?('-')
    url = url.split('-').join('/')  # /2010/01/01-some_title.html -> /2010/01/01/some_title.html
  end

  url
end

# Copy static assets outside of content instead of having nanoc3 process them.
def copy_static
  FileUtils.cp_r 'static/.', 'output/' 
end
