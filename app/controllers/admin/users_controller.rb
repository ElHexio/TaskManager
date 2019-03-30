class Admin::UsersController < Admin::ApplicationController

  before_action :set_user, only: %i[show edit update destroy]

  def show
  end

  def index
    @query = User.ransack(params[:q])
    @users = @query.result.order(:type).order(:id).page(params[:page]).per(10)
  end

  def edit
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to admin_users_url
    else
      render :new
    end
  end

  def update
    if @user.update(user_params)
      redirect_to admin_users_url
    else
      render :edit
    end
  end

  def destroy
    @user.destroy
    redirect_to admin_users_path
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :type)
  end
end
