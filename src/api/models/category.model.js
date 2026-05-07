
module.exports = mongoose => {

    const Schema = mongoose.Schema;

    
    const CategorySchema = new Schema({

        name: {
            type: String,     
            required: true,   
            unique: true      
        },

        description: String   

    }, {
        timestamps: true  
                          
                          
    });

    
    return mongoose.model("Category", CategorySchema);
};