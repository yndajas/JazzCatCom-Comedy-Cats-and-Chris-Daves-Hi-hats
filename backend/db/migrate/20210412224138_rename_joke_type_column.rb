class RenameJokeTypeColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :jokes, :type, :category
  end
end
