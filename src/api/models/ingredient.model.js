
module.exports = mongoose => {

    
    const Schema = mongoose.Schema;

    
    const IngredientSchema = new Schema({

        name: {
            type: String,    
            required: true   
        },

        quantity: String     
                             

    }, {
        timestamps: true  
                          
                          
    });

    
    return mongoose.model("Ingredient", IngredientSchema);
};