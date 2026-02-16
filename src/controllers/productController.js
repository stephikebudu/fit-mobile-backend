const Product = require("../../src/models/Product");

const formatNGN = (num) => `₦${num.toLocaleString()}`;

exports.getProducts = async (req, res) => {
  try {
    const { category, vendorId, search, page, limit, sortBy } = req.query;
    const query = {};

    // 1. Build Filters
    if (category) query.category = category;
    if (vendorId) query.vendorId = vendorId;
    if (search) query.$text = { $search: search };

    // 2. Build Sort Logic
    let sortOptions = {};
    switch (sortBy) {
      case "price_asc": sortOptions = { price: 1 }; break;
      case "price_desc": sortOptions = { price: -1 }; break;
      case "popular": sortOptions = { rating: -1, reviewsCount: -1 }; break;
      default: sortOptions = { createdAt: -1 }; // newest
    }

    // 3. Execute Query
    const skip = (page - 1) * limit;
    const [total, productsRaw] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean()
    ]);

    // 4. Transform Data for Response
    const products = productsRaw.map(p => {
      const finalPriceRaw = p.price - (p.discount || 0);
      return {
        id: p._id,
        vendorId: p.vendorId,
        vendorName: p.vendorName,
        name: p.name,
        description: p.description,
        price: formatNGN(p.price),
        discount: formatNGN(p.discount),
        finalPrice: formatNGN(finalPriceRaw),
        category: p.category,
        images: p.images,
        availableSizes: p.availableSizes,
        availableColors: p.availableColors,
        stock: p.stock,
        rating: p.rating,
        reviewsCount: p.reviewsCount,
        isSaved: false, // In a real app, check against req.user.savedProducts
        createdAt: p.createdAt
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};