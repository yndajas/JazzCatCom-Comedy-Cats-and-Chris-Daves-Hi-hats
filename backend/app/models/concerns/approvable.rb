module Approvable
    module ClassMethods
        def approve_or_reject(user_id, instance_id, approve_or_reject)
            approved = (approve_or_reject == 'approve') ? true : false
            user_resource_instance = self.find_or_create_by(user_id: user_id, :"#{self.name.gsub("User", "").underscore}_id" => instance_id)
            user_resource_instance.update(approved: approved)
        end
    end
end