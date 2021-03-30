class CreateUserJazzVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :user_jazz_videos do |t|
      t.references :user, foreign_key: true
      t.references :jazz_video, foreign_key: true
      t.boolean :approved

      t.timestamps
    end
  end
end
