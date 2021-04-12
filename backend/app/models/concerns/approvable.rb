module Approvable
    module ClassMethods
        def approve_or_reject(user_id, identifier, approve_or_reject, additional_attributes = null)
            approved = (approve_or_reject == 'approve') ? true : false
            resource_model = self.name.gsub("User", "").constantize
            resource_instance = resource_model.find_or_initialize_by(:"#{resource_model.identifier}" => identifier)
            
            if resource_instance.new_record?
                if additional_attributes
                    additional_attributes.each do |key, value|
                        resource_instance.send("#{key}=", value)
                    end
                end
                resource_instance.save
            end

            user_resource_instance = self.find_or_create_by(user_id: user_id, :"#{self.name.gsub("User", "").underscore}_id" => resource_instance.id)
            user_resource_instance.update(approved: approved)
        end
    end
end