import { Admin } from '../models/Schema.js';

export const getAllBanners = async (req, res) => {
  try {
    const admin = await Admin.findOne(); // fetch admin document which contains banner
    res.json(admin?.banner || '');  // return image URL
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch banners' });
  }
};