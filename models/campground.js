const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
 
const ImageSchema = new Schema({
        url: String,
        filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');  //"replace" only replaces the first match
})

const CampgroundSchema = new Schema ({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'  //from the review model
        }
    ]
})

CampgroundSchema.post('findOneAndDelete', async function(doc) {   //Mongoose Middleware, "doc" refers to the deleted campground info; this is a query middleware
    if(doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)