FactoryBot.define do
  sequence :email do |n|
    "email#{n}@example.com"
  end
  sequence :first_name do |n|
    "First name #{n}"
  end
  sequence :last_name do |n|
    "Last name #{n}"
  end
  sequence :password do |n|
    "secret#{n}"
  end
  sequence :description do |n|
    "Description #{n}"
  end
  sequence :string do |n|
    "String #{n}"
  end
end
