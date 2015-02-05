# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150205221041) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "recipe_id"
  end

  create_table "ingredients", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ingredients_recipes", id: false, force: true do |t|
    t.integer "ingredient_id"
    t.integer "recipe_id"
  end

  add_index "ingredients_recipes", ["ingredient_id"], name: "index_ingredients_recipes_on_ingredient_id", using: :btree
  add_index "ingredients_recipes", ["recipe_id"], name: "index_ingredients_recipes_on_recipe_id", using: :btree

  create_table "ingredients_users", id: false, force: true do |t|
    t.integer "ingredient_id"
    t.integer "user_id"
  end

  add_index "ingredients_users", ["ingredient_id"], name: "index_ingredients_users_on_ingredient_id", using: :btree
  add_index "ingredients_users", ["user_id"], name: "index_ingredients_users_on_user_id", using: :btree

  create_table "ratings", force: true do |t|
    t.integer  "score"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "recipe_id"
  end

  create_table "recipes", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
    t.string   "image_url"
    t.integer  "social_rank"
    t.string   "source_url"
    t.string   "publisher_url"
    t.string   "publisher"
    t.string   "f2f_url"
    t.integer  "recipe_id"
    t.string   "ftof_ingredients", array: true
  end

  create_table "users", force: true do |t|
    t.string   "user_name"
    t.string   "avatar"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "email",                  default: "", null: false
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
  end

  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
