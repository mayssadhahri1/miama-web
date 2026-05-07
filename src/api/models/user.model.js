
module.exports = mongoose => {

   
    const Schema = mongoose.Schema;


    const UserSchema = new Schema({

        username: {
            type: String,    
            required: true  
        },

        email: {
            type: String,    
            required: true,  
            unique: true     
        },

        password: {
            type: String,    
            required: true   
        },

        role: {
            type: String,    
            default: "user"  
                            
        },

      
        favorites: [
            {
                type: Schema.Types.ObjectId, 
                ref: "Recipe",               
                default: []                  
            }
        ]

    }, {
        timestamps: true  
                          
    });


   
    UserSchema.method("toJSON", function () {

        const { __v, _id, password, ...object } = this.toObject();

        // On ajoute l'ID sous le nom "id" (plus propre que "_id")
        object.id = _id;

        return object;
    });

    return mongoose.model("User", UserSchema);
};