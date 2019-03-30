admin = Admin.find_or_create_by(first_name: 'admin', last_name: 'admin', email: 'admin@example.com')
admin.password = 'admin'
admin.save

USER_TYPES = [Manager, Developer].freeze

60.times do |i|
  user_attrs = {
    email: "email#{i}@example.com",
    first_name: "FN#{i}",
    last_name: "LN#{i}",
  }

  index = i.odd? ? 0 : 1
  user = USER_TYPES[index].find_or_create_by(user_attrs)
  user.password = "#{i}"
  user.save
end
