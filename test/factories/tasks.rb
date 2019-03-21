FactoryBot.define do
  factory :task do
    name { generate :string }
    description
    author { create :manager }
    assignee { create :developer }
  end
end
