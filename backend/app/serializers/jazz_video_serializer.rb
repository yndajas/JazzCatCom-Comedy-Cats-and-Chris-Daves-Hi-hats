class JazzVideoSerializer
  include FastJsonapi::ObjectSerializer
  attributes :vid
  belongs_to :artist
end
