class CreateUserJokes < ActiveRecord::Migration[5.2]
  def change
    create_table :user_jokes do |t|
      t.references :user, foreign_key: true
      t.references :joke, foreign_key: true
      t.boolean :approved

      t.timestamps
    end
  end
end
