
module.exports = mongoose => {

   
    const Schema = mongoose.Schema;

    
    const FavoriteSchema = new Schema({

        userId: {
            type: Schema.Types.ObjectId, 
            ref: "User",                 
            required: true              
        },

        recipeId: {
            type: Schema.Types.ObjectId, 
            ref: "Recipe",               
            required: true               
        }

    }, {
        timestamps: true  
                         
                          
    });

    return mongoose.model("Favorite", FavoriteSchema);
};