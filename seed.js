import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product, Admin } from './models/Schema.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");

    // Clear existing products and admin (optional, for a fresh start)
    await Product.deleteMany();
    await Admin.deleteMany();

    // Add Admin (Banner and Categories)
    const adminData = new Admin({
      banner: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2000&q=80",
      categories: ["Electronics", "Clothing", "Accessories"]
    });
    await adminData.save();
    console.log("Banner added.");

    // Add Products
    const products = [
      {
        title: "Premium Wireless Headphones",
        description: "Experience crystal clear audio with our noise-cancelling premium wireless headphones. Includes a 40-hour battery life.",
        mainImg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        carousel: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"],
        sizes: ["One Size"],
        category: "Electronics",
        gender: "Unisex",
        price: 299.99,
        discount: 15
      },
      {
        title: "Classic Denim Jacket",
        description: "A timeless classic. This rugged denim jacket is perfect for any casual occasion and built to last.",
        mainImg: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
        carousel: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80"],
        sizes: ["S", "M", "L", "XL"],
        category: "Clothing",
        gender: "Men",
        price: 89.50,
        discount: 0
      },
      {
        title: "Minimalist Leather Watch",
        description: "Elegant, simple, and reliable. Features a genuine leather strap and a scratch-resistant sapphire face.",
        mainImg: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
        carousel: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80"],
        sizes: ["One Size"],
        category: "Accessories",
        gender: "Unisex",
        price: 150.00,
        discount: 20
      },
      {
        title: "Athletic Running Shoes",
        description: "Lightweight, breathable running shoes designed for ultimate comfort and performance on the track or the street.",
        mainImg: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        carousel: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"],
        sizes: ["8", "9", "10", "11", "12"],
        category: "Footwear",
        gender: "Men",
        price: 120.00,
        discount: 10
      },
      {
        title: "Smart Fitness Watch",
        description: "Track your heart rate, steps, and sleep patterns. Water-resistant up to 50 meters with a 7-day battery life.",
        mainImg: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
        carousel: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80"],
        sizes: ["One Size"],
        category: "Electronics",
        gender: "Unisex",
        price: 199.99,
        discount: 5
      },
      {
        title: "Vintage Sunglasses",
        description: "Protect your eyes in style. These vintage-inspired sunglasses offer 100% UV protection and durable frames.",
        mainImg: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        carousel: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"],
        sizes: ["One Size"],
        category: "Accessories",
        gender: "Unisex",
        price: 45.00,
        discount: 0
      },
      {
        title: "Canvas Backpack",
        description: "Durable and spacious canvas backpack with a laptop sleeve. Perfect for school, work, or travel.",
        mainImg: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        carousel: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"],
        sizes: ["One Size"],
        category: "Accessories",
        gender: "Unisex",
        price: 65.99,
        discount: 15
      },
      {
        title: "Cotton Crewneck T-Shirt",
        description: "Soft, breathable 100% cotton t-shirt. An essential wardrobe staple available in multiple colors.",
        mainImg: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        carousel: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        category: "Clothing",
        gender: "Men",
        price: 25.00,
        discount: 0
      },
      {
        title: "Yoga Mat with Alignment Lines",
        description: "Eco-friendly, non-slip yoga mat featuring alignment lines to perfect your poses. Includes carrying strap.",
        mainImg: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
        carousel: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80"],
        sizes: ["Standard"],
        category: "Sports",
        gender: "Unisex",
        price: 40.00,
        discount: 10
      },
      {
        title: "Ceramic Coffee Mug",
        description: "Start your morning right with this beautifully crafted, handcrafted ceramic coffee mug. Microwave and dishwasher safe.",
        mainImg: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
        carousel: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80"],
        sizes: ["12oz", "16oz"],
        category: "Home",
        gender: "Unisex",
        price: 18.50,
        discount: 0
      }
    ];

    await Product.insertMany(products);
    console.log("Products added successfully!");

    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
