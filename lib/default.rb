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

# Create category/tag pages (uses layouts/category.haml
def create_category_pages
  tags.keys.each do |tag|
    items << Nanoc3::Item.new(
      "= render('category', :tag => '#{tag}')",
      {
        :title => "Category: #{tag}",
        :changefreq => 'daily',
        :priority => 0.4
      },
      "/categories/#{tag.downcase.parameterize}/",
      :binary => false
    )
  end
end

# Copy static assets outside of content instead of having nanoc3 process them.
def copy_static
  FileUtils.cp_r 'static/.', 'output/', :preserve => true
end

def apply_filters
  # item[:extension] returns 'html.erb' for multi-dotted filename
  ext = item[:extension].nil? ? nil : item[:extension].split('.').last

  if ext == 'haml' || ext.nil?
    filter :haml, :attr_wrapper => '"'
  elsif ext == 'md' || ext == 'markdown'
    filter :erb
    filter :rdiscount
    filter :colorize_syntax
  elsif !item.binary?
    filter :erb
  end
end

def apply_layout
  unless item.binary?
    # use layouts with .html extension or layout specified in meta
    item[:layout] = "none" unless item[:layout] || File.extname(route_path(item)) == '.html'
    layout(item[:layout] || 'default') unless item[:layout] == "none"
  end
end

def apply_filters_and_layout
  apply_filters
  apply_layout
end

# insert colorized code into markdown filtered content (use as block helper)
def code(lang, &block)
  source_code = capture(&block).strip
  eval('_erbout', block.binding).concat %Q(<pre class="CodeRay"><code class="language-#{lang}">#{html_escape source_code}</code></pre>)
end

# get a Hash with all article tags as keys and their frequency as value
def tags
  articles.map { |article| article[:tags] }.flatten.compact.inject(Hash.new(0)) { |frequency_map, tag|
    frequency_map[tag] += 1
    frequency_map
  }
end

# get keywords for <meta>
def keywords
  (@item[:keywords] || @site.config[:default_keywords]).join(', ')
end

# get description for <meta>
def description
  @item[:excerpt]
end
