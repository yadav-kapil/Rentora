/**
 * Seed Script — Homes
 * ---------------------
 * Clears all existing homes from the DB and inserts 20 fresh sample homes.
 *
 * Usage:
 *   node seeds/seedHomes.js
 */

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const Home = require("../models/homes.model");

const HOST_ID = new mongoose.Types.ObjectId("6a5931eb21c11d584681eeed");

const homes = [
  {
    title: "Serene Beachfront Villa in Goa",
    description: "Wake up to the sound of waves in this stunning 4-bedroom villa right on Calangute Beach. Enjoy a private pool, outdoor BBQ, and breathtaking ocean views.",
    imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop",
    price: 12000,
    location: "Calangute, Goa",
    category: "Beachfront",
    bedrooms: 4,
    guestNumbers: 8,
    amenities: ["Private Pool", "WiFi", "Air Conditioning", "BBQ Grill", "Beach Access", "Parking"],
    host: HOST_ID,
  },
  {
    title: "Cozy Studio in the Heart of Bandra",
    description: "A beautifully designed studio apartment in Bandra West, walking distance from cafes, restaurants, and the iconic Bandstand promenade.",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
    price: 3200,
    location: "Bandra West, Mumbai",
    category: "Apartment",
    bedrooms: 1,
    guestNumbers: 2,
    amenities: ["WiFi", "Air Conditioning", "Smart TV", "Washing Machine"],
    host: HOST_ID,
  },
  {
    title: "Luxury Himalayan Cabin in Manali",
    description: "Escape to this premium log cabin nestled among pine forests with stunning snow-capped mountain views. Perfect for couples and small families.",
    imageUrl: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&auto=format&fit=crop",
    price: 8500,
    location: "Old Manali, Himachal Pradesh",
    category: "Cabin",
    bedrooms: 2,
    guestNumbers: 4,
    amenities: ["Fireplace", "WiFi", "Mountain View", "Trekking Trails", "Bonfire Area"],
    host: HOST_ID,
  },
  {
    title: "Heritage Haveli in the Pink City",
    description: "Stay in a 200-year-old restored haveli in the old city of Jaipur. Ornate architecture, rooftop dining, and royal-style interiors await you.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
    price: 6800,
    location: "Old City, Jaipur",
    category: "Villa",
    bedrooms: 3,
    guestNumbers: 6,
    amenities: ["Rooftop Terrace", "WiFi", "Air Conditioning", "Concierge", "Breakfast Included"],
    host: HOST_ID,
  },
  {
    title: "Minimalist Apartment in Koramangala",
    description: "Modern, clean 2BHK apartment in the startup hub of Bangalore. Great connectivity and surrounded by the best restaurants and nightlife.",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    price: 4500,
    location: "Koramangala, Bangalore",
    category: "Apartment",
    bedrooms: 2,
    guestNumbers: 4,
    amenities: ["WiFi", "Air Conditioning", "Gym Access", "Power Backup", "Parking"],
    host: HOST_ID,
  },
  {
    title: "Treehouse Retreat in Wayanad",
    description: "A one-of-a-kind stay inside a real treehouse surrounded by a spice plantation in the lush Western Ghats. Meals from the garden included.",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
    price: 5500,
    location: "Vythiri, Wayanad",
    category: "Cabin",
    bedrooms: 1,
    guestNumbers: 2,
    amenities: ["Plantation Tour", "Meals Included", "Nature Trails", "Bird Watching"],
    host: HOST_ID,
  },
  {
    title: "Skyline Penthouse in Hyderabad",
    description: "Premium 3-bedroom penthouse on the 28th floor with panoramic views of HITEC City. Fully furnished with a rooftop jacuzzi and private terrace.",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
    price: 18000,
    location: "HITEC City, Hyderabad",
    category: "Apartment",
    bedrooms: 3,
    guestNumbers: 6,
    amenities: ["Rooftop Jacuzzi", "WiFi", "Air Conditioning", "City View", "Smart Home", "Parking"],
    host: HOST_ID,
  },
  {
    title: "Riverside Farmhouse in Rishikesh",
    description: "Meditate, do yoga, and unwind in this beautiful riverside farmhouse on the Ganges. The perfect base for adventure sports and spiritual retreats.",
    imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop",
    price: 7200,
    location: "Tapovan, Rishikesh",
    category: "Farmhouse",
    bedrooms: 3,
    guestNumbers: 6,
    amenities: ["River View", "Yoga Deck", "WiFi", "Bonfire", "Adventure Sports Nearby", "Meals Available"],
    host: HOST_ID,
  },
  {
    title: "Colonial Bungalow in Ooty",
    description: "A classic colonial-era bungalow set in a private tea garden in the Nilgiris. Complete with a fireplace, billiards room, and wraparound veranda.",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
    price: 9500,
    location: "Kotagiri, Ooty",
    category: "Villa",
    bedrooms: 4,
    guestNumbers: 8,
    amenities: ["Fireplace", "Tea Garden", "Billiards Room", "WiFi", "Butler Service", "Parking"],
    host: HOST_ID,
  },
  {
    title: "Modern Loft in Hauz Khas Village",
    description: "Artsy 1-bedroom loft in the cultural heart of Delhi, surrounded by galleries, boutiques, and the Hauz Khas lake. Perfect for solo travelers and couples.",
    imageUrl: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&auto=format&fit=crop",
    price: 3800,
    location: "Hauz Khas, New Delhi",
    category: "Apartment",
    bedrooms: 1,
    guestNumbers: 2,
    amenities: ["WiFi", "Air Conditioning", "Rooftop Access", "Smart TV"],
    host: HOST_ID,
  },
  {
    title: "Cliffside Villa in Varkala",
    description: "Perched on the famous Varkala cliff, this 3-bedroom villa offers unobstructed views of the Arabian Sea. A short walk to natural springs and beach restaurants.",
    imageUrl: "https://images.unsplash.com/photo-1605538883369-be2571cf27d2?w=800&auto=format&fit=crop",
    price: 9000,
    location: "Varkala, Kerala",
    category: "Beachfront",
    bedrooms: 3,
    guestNumbers: 6,
    amenities: ["Ocean View", "Private Pool", "WiFi", "Air Conditioning", "Hammock", "Kitchen"],
    host: HOST_ID,
  },
  {
    title: "Desert Camp Glamping in Jaisalmer",
    description: "Experience the magic of the Thar Desert in a luxurious tent with a king bed, en-suite bathroom, and traditional Rajasthani dinner under the stars.",
    imageUrl: "https://images.unsplash.com/photo-1509600110300-21b9d5fedeb7?w=800&auto=format&fit=crop",
    price: 6500,
    location: "Sam Sand Dunes, Jaisalmer",
    category: "Cabin",
    bedrooms: 1,
    guestNumbers: 2,
    amenities: ["Camel Safari", "Cultural Performances", "Meals Included", "Stargazing", "Desert Jeep Tour"],
    host: HOST_ID,
  },
  {
    title: "Houseboat Stay in Alleppey",
    description: "Cruise the famous Kerala backwaters on a traditional Kettuvallam houseboat with an onboard chef, AC bedrooms, and sundeck. 1 night cruise included.",
    imageUrl: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&auto=format&fit=crop",
    price: 11000,
    location: "Alleppey, Kerala",
    category: "Beachfront",
    bedrooms: 2,
    guestNumbers: 4,
    amenities: ["Onboard Chef", "AC Bedrooms", "Sundeck", "Fishing Equipment", "Meals Included"],
    host: HOST_ID,
  },
  {
    title: "Boutique Apartment in Auroville",
    description: "A tranquil, eco-friendly apartment near the Matrimandir in Auroville. Perfect for those seeking peace, mindfulness, and the unique culture of Pondicherry.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    price: 4000,
    location: "Auroville, Pondicherry",
    category: "Apartment",
    bedrooms: 1,
    guestNumbers: 2,
    amenities: ["WiFi", "Bicycle Rental", "Organic Garden", "Meditation Space", "Eco-Friendly"],
    host: HOST_ID,
  },
  {
    title: "Mountain View Chalet in Coorg",
    description: "A gorgeous 2-bedroom chalet deep inside a coffee estate in Coorg. Wake up to the aroma of fresh coffee and enjoy sweeping views of the Western Ghats.",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop",
    price: 7800,
    location: "Madikeri, Coorg",
    category: "Farmhouse",
    bedrooms: 2,
    guestNumbers: 4,
    amenities: ["Coffee Estate Tour", "WiFi", "Mountain View", "Trekking", "Bonfire", "Parking"],
    host: HOST_ID,
  },
  {
    title: "Sea-Facing Flat in Bandra-Worli Sealink Area",
    description: "A spectacular 2BHK with direct sea views right opposite the Bandra-Worli Sea Link. Fully equipped kitchen, premium interiors, and 24/7 concierge.",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop",
    price: 14000,
    location: "Worli, Mumbai",
    category: "Apartment",
    bedrooms: 2,
    guestNumbers: 4,
    amenities: ["Sea View", "WiFi", "Air Conditioning", "Concierge", "Gym", "Swimming Pool", "Parking"],
    host: HOST_ID,
  },
  {
    title: "Backpacker Hostel Room in Mcleodganj",
    description: "A private room in a social hostel in the Dalai Lama's town. Great vibes, common kitchen, movie nights, and stunning Dhauladhar range views.",
    imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop",
    price: 1200,
    location: "McLeod Ganj, Dharamshala",
    category: "Apartment",
    bedrooms: 1,
    guestNumbers: 2,
    amenities: ["WiFi", "Common Kitchen", "Mountain View", "Movie Nights", "Travel Desk"],
    host: HOST_ID,
  },
  {
    title: "Luxury Farmstay in Alibaug",
    description: "A gorgeous 5-bedroom farmhouse just 2 hours from Mumbai by ferry. Includes a private pool, mango orchard, and a BBQ deck perfect for weekend getaways.",
    imageUrl: "https://images.unsplash.com/photo-1464890100898-a385f744067f?w=800&auto=format&fit=crop",
    price: 22000,
    location: "Alibaug, Maharashtra",
    category: "Farmhouse",
    bedrooms: 5,
    guestNumbers: 10,
    amenities: ["Private Pool", "Mango Orchard", "BBQ Deck", "WiFi", "Caretaker", "Parking", "Air Conditioning"],
    host: HOST_ID,
  },
  {
    title: "Lakeside Cottage in Nainital",
    description: "A charming 2-bedroom stone cottage steps from Naini Lake. Row a boat, shop on Mall Road, and come back to your cozy lakeside nest.",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop",
    price: 5800,
    location: "Mallital, Nainital",
    category: "Cabin",
    bedrooms: 2,
    guestNumbers: 4,
    amenities: ["Lake View", "WiFi", "Fireplace", "Boating Access", "Mountain View"],
    host: HOST_ID,
  },
  {
    title: "Glass House in the Munnar Tea Estates",
    description: "A unique glass-walled villa surrounded by endless tea gardens at 1700m altitude. Sip your morning tea while fog rolls through the estates outside your window.",
    imageUrl: "https://images.unsplash.com/photo-1469796466635-455ede028aca?w=800&auto=format&fit=crop",
    price: 10500,
    location: "Munnar, Kerala",
    category: "Villa",
    bedrooms: 3,
    guestNumbers: 6,
    amenities: ["Tea Estate View", "WiFi", "Fireplace", "Trekking", "Plantation Tour", "Meals Available", "Parking"],
    host: HOST_ID,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB:", process.env.MONGO_URL);

    // Wipe existing homes
    const deleted = await Home.deleteMany({});
    console.log(`🗑️  Removed ${deleted.deletedCount} existing home(s).`);

    // Insert sample homes
    const inserted = await Home.insertMany(homes);
    console.log(`🏠  Inserted ${inserted.length} sample home(s) successfully.`);

    console.log("\n📋 Homes seeded:");
    inserted.forEach((h, i) => {
      console.log(`   ${i + 1}. [${h.category}] ${h.title} — ₹${h.price}/night (${h.location})`);
    });
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB.");
  }
}

seed();
