const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
  console.log('Database connected!!')
}

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6317cd07e91282b8bd343d69',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut expedita similique quo ut consequuntur. Perspiciatis quasi dolorum nesciunt numquam unde rem dolore praesentium odio. Maiores rerum minus laboriosam impedit dolore!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dfweogqga/image/upload/v1663278641/YelpCamp/ojdzkmsgqllr4xehlavz.jpg',
          filename: 'YelpCamp/ojdzkmsgqllr4xehlavz'
        },
        {
          url: 'https://res.cloudinary.com/dfweogqga/image/upload/v1663278641/YelpCamp/sqfncdhnqmgj9tcni10q.png',
          filename: 'YelpCamp/sqfncdhnqmgj9tcni10q'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})