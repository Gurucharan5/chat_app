class Api::V1::PostsController < ApplicationController
    def create
        # Extract the JWT token from the request headers
        token = request.headers['Authorization']&.split(' ')&.last
        # require 'zlib'
        # compressed_string = Zlib::Deflate.deflate(params[:image])

        # puts "Original String: #{compressed_string}"
      
        # Verify and decode the token using your secret_key
        begin
          decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
          user_id = decoded_token[0]['user_id']
          # Now you have the user_id of the user making the request
          puts "user-id-----"+user_id.to_s
          username = User.where(id: user_id).first
          # Create the post and associate it with the user using user_id
          post = Post.new( content: params[:content], user_id: user_id,image: params[:image],username: username.username)
          if post.save
            render json: post, status: :created
          else
            render json: { error: 'Failed to create the post' }, status: :unprocessable_entity
          end
        rescue JWT::DecodeError
          render json: { error: 'Invalid token' }, status: :unauthorized
        end
    end

    def getpost
        @posts = Post.all
        @posts = @posts.reverse
        
        render json: @posts
    end
end
