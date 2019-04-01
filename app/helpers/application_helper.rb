module ApplicationHelper
  def present(model)
    klass = "#{model.class}Presenter".constantize
    presenter = klass.new(model, self)

    return presenter unless block_given?

    yield(presenter)
  end
end
