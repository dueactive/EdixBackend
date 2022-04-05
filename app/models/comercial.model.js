module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nombre: String,
      usuario: String,
      pwd: String,
      email: String,
      rol: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Comercial = mongoose.model("comerciales", schema);
  return Comercial;
};
