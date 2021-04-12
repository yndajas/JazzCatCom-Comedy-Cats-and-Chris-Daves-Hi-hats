module Gettable
    module ClassMethods
        def get(user_id, request_path)
            if user_id
                user = User.find(user_id)
                resource = request_path.scan(/[^\/][a-z-]+/)[1].gsub("-", "_")
                type = (request_path.gsub(/.*\//, "") == "unseen") ? "unseen" : "approved"
                user.send(type, resource)
            else
                self.all
            end
        end    
    end
end