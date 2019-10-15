const Booking = require ('../models/Bokking')
module.exports  ={
    async store(req, res){
        const {booking_id} = req.params;
        const booking = await Booking.findById(booking_id).populate('spot')
        booking.approved = false;
        await booking.save();
        const bookingsUserSocket = req.connectedUsers[booking.user]
        if(bookingsUserSocket){
        req.io.to(bookingsUserSocket).emit("booking_response", booking)
        }
        return res.json(booking)
    }
}