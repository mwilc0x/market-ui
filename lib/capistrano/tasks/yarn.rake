namespace :yarn do

  def build
    within current_path do
      execute :yarn, :install
      execute :yarn, :build
    end
  end
end
