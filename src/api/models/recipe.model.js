
module.exports = mongoose => {


    const Schema = mongoose.Schema;

    const RecipeSchema = new Schema({

        title: {
            type: String,   
            required: true   
        },

        description: {
            type: String,    
            required: true  
        },

        
        category: {
            type: Schema.Types.ObjectId, 
            ref: "Category",             
            required: true              
        },

        
        ingredients: {
            type: [String], 
                            
            default: []   
        },

        difficulty: {
            type: String,                         
            enum: ["facile", "moyen", "difficile"], 
            default: "facile"                       
        },

        image: {
            type: String,                                    
            default: "https://via.placeholder.com/300x180"  
        },

        slug: {
            type: String,    
            required: true,  
            unique: true     
        }

    }, {
        timestamps: true 

    });


    return mongoose.model("Recipe", RecipeSchema);
};