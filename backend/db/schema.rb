# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_13_182314) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cats", force: :cascade do |t|
    t.string "filename"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jazz_videos", force: :cascade do |t|
    t.string "vid"
    t.bigint "artist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_jazz_videos_on_artist_id"
  end

  create_table "jokes", force: :cascade do |t|
    t.integer "external_api_id"
    t.string "category"
    t.string "setup"
    t.string "punchline"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_cats", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "cat_id"
    t.boolean "approved"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cat_id"], name: "index_user_cats_on_cat_id"
    t.index ["user_id"], name: "index_user_cats_on_user_id"
  end

  create_table "user_jazz_videos", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "jazz_video_id"
    t.boolean "approved"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jazz_video_id"], name: "index_user_jazz_videos_on_jazz_video_id"
    t.index ["user_id"], name: "index_user_jazz_videos_on_user_id"
  end

  create_table "user_jokes", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "joke_id"
    t.boolean "approved"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["joke_id"], name: "index_user_jokes_on_joke_id"
    t.index ["user_id"], name: "index_user_jokes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "token"
  end

  add_foreign_key "user_cats", "cats"
  add_foreign_key "user_cats", "users"
  add_foreign_key "user_jazz_videos", "jazz_videos"
  add_foreign_key "user_jazz_videos", "users"
  add_foreign_key "user_jokes", "jokes"
  add_foreign_key "user_jokes", "users"
end
