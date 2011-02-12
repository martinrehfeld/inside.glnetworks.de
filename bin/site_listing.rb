#!/usr/bin/env ruby

require 'rubygems'
require 'anemone'

Anemone.crawl('http://inside.glnetworks.de', :discard_page_bodies => true) do |anemone|
  anemone.on_every_page do |page|
    puts "#{page.url.path} #{page.fetched? ? 'OK' : 'FAIL'} #{page.response_time} ms"
  end
end
