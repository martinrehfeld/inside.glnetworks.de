require 'nanoc3/tasks'

desc "Compile /content to /output"
task :compile => :clean do
  sh 'bundle exec nanoc compile'
end

desc "Preview (compile once) site on http://localhost:3000"
task :preview => :compile do
  sh 'bundle exec nanoc view'
end

desc "Watch (auto-compile) site on http://localhost:3000"
task :watch => :compile do
  sh 'bundle exec nanoc autocompile'
end

desc "Run validations (fails when errors are found)"
task :validate => :compile do
  output = `rake validate:links:internal`; puts output
  if output =~ /^Broken link/
    $stderr.puts 'Validation errors where found! ' +
                 'Task ABORTED!'
    exit 1
  end
end

desc "Commit and tag changes to git repo"
task :commit do
  sh 'git add .'
  sh 'git commit' unless `git status` =~ /^nothing to commit/
end

desc "Publish /output (commit, sync, tag and push)"
task :publish => [:compile, :commit, :'deploy:heroku'] do
  sh 'git tag -f "live"'
  sh 'git push'
end

namespace :deploy do
  desc "Push inside.glnetworks.de-live to heroku"
  task :heroku do
    site = Nanoc3::Site.new('.')
    if site.nil?
      $stderr.puts 'The current working directory does not seem to be a ' +
                   'valid/complete nanoc site directory; aborting.'
      exit 1
    end
    live_dir = File.expand_path("../#{site.config[:deploy]['default']['live_project']}")

    sh "cd '#{live_dir}' && git add ."
    unless `cd '#{live_dir}' && git status` =~ /^nothing to commit/
      sh "cd '#{live_dir}' && git commit -m 'content build #{Time.now}'"
      sh "cd '#{live_dir}' && git push heroku"
    end
  end
end
