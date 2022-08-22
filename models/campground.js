const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;


const CampgroundSchema = new Schema ({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
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