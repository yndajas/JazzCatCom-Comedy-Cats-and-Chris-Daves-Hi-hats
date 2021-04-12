class CreateJokes < ActiveRecord::Migration[5.2]
  def change
    create_table :jokes do |t|
      t.integer :external_api_id
      t.string :type
      t.string :setup
      t.string :punchline

      t.timestamps
    end
  end
end
