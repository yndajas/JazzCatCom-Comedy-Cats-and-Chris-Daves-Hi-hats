class CreateUserCats < ActiveRecord::Migration[5.2]
  def change
    create_table :user_cats do |t|
      t.references :user, foreign_key: true
      t.references :cat, foreign_key: true
      t.boolean :approved

      t.timestamps
    end
  end
end
