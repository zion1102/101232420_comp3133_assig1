const User = require('./models/Employee');
const Listing = require('./models/Listing');
const Booking  = require("./models/Bookings")


exports.resolvers = {
    Query: {
        getUsers: async (parent, args) => {
            return User.find({})
        },
        getUserByID: async (parent, args) => {
            return User.findById(args.id)
        },
        getUserByType: async (parent, args) => {
            return User.find({"type" : args.type})
        },
        getListingByUser: async (parent, args) => {
            return Listing.find({"username": args.username})
        },
        getListingByName: async (parent, args) => {
            return Listing.find({"listingTitle" : args.listingTitle})
        },
        getListingByCity: async (parent, args) => {
            return Listing.find({"city" : args.city})
        },
        getListingByPostalCode: async (parent, args) => {
            return Listing.find({"postalCode" : args.postalCode})
        },
        getUserBookings: async (parent, args) => {
            return Booking.find({"username" : args.username})
        },
        login: async(parent, args)=>{
            let user = await User.findOne({$and:[{username:args.username}, {password: args.password}]})
            if (!user){
                throw new Error("user and/or password incorrect")
            }
            if (user.type== 'admin'){
                return{secret: process.env.SECRET_ADMMIN}
            }else{
                return {secret: process.env.SECRET_USER}
            }
        }
       
    },

    Mutation: {
        addUser: async (parent, args) => {
            console.log(args)

            let newUser = new User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                type: args.type,
                password: args.password
                
            })

            return newUser.save()
        },
        updateUser: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }

            return await User.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                type: args.type,
                password: args.password
                }
            }, {new: true}, (err, user) => {
                if (err) 
                {
                    console.log('Something went wrong when updating the user');
                } else 
                {
                    return user
                }
            }
        );
      },
      deleteUser: async (parent, args) => {
        console.log(args)
        if (!args.id){
            return JSON.stringify({status: false, "message" : "No ID found"});
        }
        return await User.findByIdAndDelete(args.id)
      },

      addListing: async (parent, args) => {
        console.log(args)

        let newListing = new Listing({

            listingId: args.listingId,
            listingTitle: args.listingTitle,
            description: args.description, 
            street: args.street,
            city: args.city,
            postalCode: args.postalCode,
            price: args.price,
            email: args.email,
            username: args.username
           
            
        })

        return newListing.save()
    },
    updateListing: async (parent, args) => {
        console.log(args)
        if (!args.id){
            return;
        }

        return await Listing.findOneAndUpdate(
        {
            _id: args.id
        },
        {
            $set: {
                listingId: args.listingId,
                listingTitle: args.listingTitle,
                description: args.description, 
                street: args.street,
                city: args.city,
                postalCode: args.postalCode,
                price: args.price,
                email: args.email,
                username: args.username
            }
        }, {new: true}, (err, listing) => {
            if (err) 
            {
                console.log('Something went wrong when updating the listing');
            } else 
            {
                return listing
            }
        }
    );
  },
  deleteListing: async (parent, args) => {
    console.log(args)
    if (!args.id){
        return JSON.stringify({status: false, "message" : "No ID found"});
    }
    return await Listing.findByIdAndDelete(args.id)
  },
  addBooking: async (parent, args) => {
    console.log(args)

    let newBooking = new Booking({

        listingId: args.listingId,
        bookingId: args.bookingId,
        bookingStart: args.bookingStart, 
        bookingEnd: args.bookingEnd,
        
        username: args.username
       
        
    })

    return newBooking.save()
},
/*
login: async(_,{username, password},{req} )=>{
    const user = await User.findOne({where: {username}})
    if(!user){
        return null
    }

    const accessToken = sign({userID: user.id},)

    return user;
}
    */
    }
}