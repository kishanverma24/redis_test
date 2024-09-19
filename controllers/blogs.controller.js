const { connectRedis } = require("../config/redis.config");
const { Blog } = require("../model/blog.model");

let redisConnectionClient;
(async () => {
  redisConnectionClient = await connectRedis();
})();

exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await redisConnectionClient.get("blogs");
    if (allBlogs) {
      console.log("Data from Redis");
      return res.status(200).json(JSON.parse(allBlogs));
    }
    console.log("Data from mongoDb");

    const blogs = await Blog.find();
    await redisConnectionClient.set("blogs", JSON.stringify(blogs));
    console.log("Data set in Redis");

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
