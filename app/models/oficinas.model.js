module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        is_available: Boolean,
        road_name: String,
        zip_code:  String,
        province:  String,
        city:  String,
        modality:  String,
        latitude: String,
        longitude: String,
        floor: Number,
        parking_public: Boolean,
        parking_private: Boolean,
        underground: String,
        train:  String,
        bus: String,
        comercial: String,
        extPath: String

      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Oficinas = mongoose.model("oficinas", schema);
    return Oficinas;
  };
  