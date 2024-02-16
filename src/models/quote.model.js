const mongoose=require('mongoose')

const quoteSchema=new mongoose.Schema({

    // quoteId:{type:Number,required:true},
    quote:{type:String,required:true,unique:true},
    quoteTitle:{type:String,required:true,default:"Today's Quote"},
    quoteAuthor:{type:String,default:"Shaik Muneer"},
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }

    // quote description,quote title,quote author,qid
})

// quoteSchema.plugin(autoIncrement.plugin, { model: 'Quotes', field: 'quoteId' });
quoteSchema.index({ _id: 1 }, { unique: true }); // Ensure uniqueness for the _id field

const Quote=mongoose.model('Quotes',quoteSchema)

module.exports=Quote