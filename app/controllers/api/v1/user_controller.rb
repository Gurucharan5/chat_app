class Api::V1::UserController < ApplicationController
    def index
    end

    def create_user
        check_user  =  User.where(email: user_params["email"]).first
        if check_user
            render json: "already exists", status: 205
        else
            @user = User.new(user_params)
            if @user.save 
                render json: @user, status: :created, location: @user
            else
                render json: @user.errors, status: :unprocessable_entity
            end
        end
         
    end

    def login 
        check_user = User.where(email: user_params["email"],password: user_params["password"]).first
        if check_user
            render json: check_user, status: 200
        else
            render json: "email or password wrong", status: 404
        end
    end

    def image 
        puts "-------------"+user_params["image"].to_s
        # @profile = Profile.create(image: user_params["image"])
        @profile = Profile.where(id: 8).first
        puts "--------hhhghg-------"+@profile.image.to_s

        render json: @profile.image, status: 200
    end

    private 
        def user_params
            params.require(:user).permit(:email, :password , :image)
        end
end
