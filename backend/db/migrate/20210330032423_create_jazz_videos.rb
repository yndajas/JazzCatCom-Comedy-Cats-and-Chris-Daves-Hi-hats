class CreateJazzVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :jazz_videos do |t|
      t.string :vid
      t.references :artist

      t.timestamps
    end
  end
end
