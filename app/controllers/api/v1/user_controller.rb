class Api::V1::UserController < ApplicationController
    require 'jwt'

    def index
    end

    def create_user
        check_user  =  User.where(email: user_params["email"]).first
        if check_user
            render json: "already exists", status: 205
        else
            @user = User.new(user_params)
            
            
            if @user.save 
                user = User.where(email: user_params["email"]).first
                Profile.create(username: user_params["username"],email: user_params["email"],user_id: user.id)
                render json: @user, status: :created
            else
                render json: @user.errors, status: :unprocessable_entity
            end
        end
         
    end

    def login 
        check_user = User.where(email: user_params["email"],password: user_params["password"]).first
        puts check_user.id.to_s+"----currentuserid------"

        if check_user
            # session[:user] = check_user.id
            token = generate_token(check_user)
            render json: { token: token }, status: 200
        else
            render json: "email or password wrong", status: 404
        end
    end

    

    # Define a method to generate a JWT token
    def generate_token(user)
        payload = {
        user_id: user.id,
        email: user.email,
        # You can add additional claims as needed
        }
    
        secret_key = Rails.application.secrets.secret_key_base
        token = JWT.encode(payload, secret_key, 'HS256')
    
        token
    end
  

    private 
        def user_params
            params.require(:user).permit(:email, :password , :username)
        end
end
