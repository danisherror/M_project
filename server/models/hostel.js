const mongoose = require('mongoose');

const MAX_ROOMS_PER_BLOCK = 10; // Maximum rooms per block

async function initializeRooms(hostelBlocks) {
    try {
        for (const hostelName in hostelBlocks) {
            const blocks = hostelBlocks[hostelName];
            for (const block of blocks) {
                const existingRoomsCount = await CollegeHostelRoom.countDocuments({ hostelName: hostelName, block: block });
                if (existingRoomsCount < MAX_ROOMS_PER_BLOCK) {
                    const additionalRoomsCount = MAX_ROOMS_PER_BLOCK - existingRoomsCount;
                    const emptyRooms = Array.from({ length: additionalRoomsCount }, (_, index) => {
                        const roomNumber = `${block.charAt(6)}${index + 1}`.padStart(3, '0');
                        return {
                            hostelName: hostelName,
                            block: block,
                            roomNumber: roomNumber
                            // Other fields can be left empty or set to default values
                        };
                    });
                    await CollegeHostelRoom.insertMany(emptyRooms);
                }
            }
        }
    } catch (error) {
        console.error('Error initializing rooms:', error.message);
    }
}

const collegeHostelRoomSchema = new mongoose.Schema({
    hostelName: {
        type: String,
        required: [true, 'Please provide the hostel name']
    },
    block: {
        type: String,
        required: [true, 'Please provide the block/building name']
    },
    roomNumber: {
        type: String,
        required: [true, 'Please provide a room number'],
        unique: true,
        maxlength: [10, 'Room number should be under 10 characters']
    },
    type: {
        type: String,
        default: 'Double' // Assuming all rooms are double occupancy
    },
    studentIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
    },
    capacity: {
        type: Number,
        default: 2 // Double occupancy room
    },
    status: {
        type: String,
        default: 'available' // Assuming 'available' as default status, change as needed
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

collegeHostelRoomSchema.pre('save', async function(next) {
    if (this.isNew) {
        await initializeRooms({
            "Fresher": ["Block A", "Block B", "Block C"],
            "Aryabhatta": ["Block X", "Block Y", "Block Z"]
        });
    }
    next();
});

const CollegeHostelRoom = mongoose.model('CollegeHostelRoom', collegeHostelRoomSchema);

// Call the initialization function
initializeRooms({
    "Fresher": ["Block A", "Block B", "Block C"],
    "Aryabhatta": ["Block X", "Block Y", "Block Z"]
});

module.exports = CollegeHostelRoom;
