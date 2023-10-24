class Api::V1::ProfileController < ApplicationController
    def image 
        # @profile = Profile.create(image: user_params["image"])
        token = request.headers['Authorization']&.split(' ')&.last
        begin
            decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
            user_id = decoded_token[0]['user_id']
            # Now you have the user_id of the user making the request
            puts "user-id-----"+user_id.to_s
            check_profile = Profile.where(user_id: user_id).first
            if check_profile.present?
                puts "user present"
                check_profile.update(image: params[:image])
                render json: check_profile, status: :created
            else
                puts "user not present"
                render json: { error: 'Failed to update profile picture' }, status: :unprocessable_entity
            end
            # Create the post and associate it with the user using user_id
            
        rescue JWT::DecodeError
        render json: { error: 'Invalid token' }, status: :unauthorized
        end
        
        # puts "--------hhhghg-------"+@profile.image.to_s

        
    end

    def getimage
        token = request.headers['Authorization']&.split(' ')&.last
        begin
            decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
            user_id = decoded_token[0]['user_id']
            # Now you have the user_id of the user making the request
            puts "user-id-----"+user_id.to_s
            check_profile = Profile.where(user_id: user_id).first
            if check_profile.present?
                
                render json: {data: check_profile}, status: :created
            else
                puts "user not present"
                render json: { error: 'Failed to update profile picture' }, status: :unprocessable_entity
            end
            # Create the post and associate it with the user using user_id
            
        rescue JWT::DecodeError
        render json: { error: 'Invalid token' }, status: :unauthorized
        end

    end

    def doxapi
        puts "coming inside dexcom api"
        client_id = 'h63E3yBfYZz4CSyEDb32Da3TuwTdHh3H'
        redirect_uri = 'https://dev.healthplotter.com/'
        state = 'your_state_value'
        scope = 'offline_access'

        dexcom_login_url = "https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=#{client_id}&redirect_uri=#{redirect_uri}&response_type=code&scope=#{scope}&state=#{state}"

        redirect_to dexcom_login_url
    end
end
