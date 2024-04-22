class CraeateVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :videos do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.string :video_id
      t.string :description

      t.timestamps
    end
  end
end
