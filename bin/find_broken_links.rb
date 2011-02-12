#!/usr/bin/env ruby

require 'rubygems'
require 'spidr'

url_map = Hash.new { |hash,key| hash[key] = [] }

spider = Spidr.site('http://inside.glnetworks.de/') do |spider|
  spider.every_link do |origin,dest|
    url_map[dest] << origin
  end
end

spider.failures.each do |url|
  puts "Broken link #{url} found in:"
  url_map[url].each { |page| puts "  #{page}" }
end
