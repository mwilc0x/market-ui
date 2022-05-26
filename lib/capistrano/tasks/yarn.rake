namespace :yarn do
  def yarn_install
    within current_path do
      execute :yarn, :install
    end
  end
  
  def yarn_build
    within current_path do
      execute :yarn, :build
    end
  end

  desc 'Run yarn build'
  task :build do
    on roles(:app) do
      yarn_install
      yarn_build
    end
  end
end