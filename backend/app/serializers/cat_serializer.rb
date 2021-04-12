class CatSerializer
  include FastJsonapi::ObjectSerializer
  attributes :filename
end
