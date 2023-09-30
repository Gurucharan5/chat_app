class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.string :username
      t.string :email
      t.string :status
      t.longtext :image
      t.timestamps
    end
  end
end
