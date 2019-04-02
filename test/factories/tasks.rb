FactoryBot.define do
  factory :task do
    name { generate :string }
    description
    author_id { create(:manager).id }
    assignee_id { create(:developer).id }
  end
end
