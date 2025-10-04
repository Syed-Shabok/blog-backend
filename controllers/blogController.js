let blogs = [];

// Create blog
exports.createBlog = (req, res) => {
  const { title, content, author } = req.body;
  const newBlog = {
    id: blogs.length + 1,
    title,
    content,
    author,
    createdAt: new Date()
  };
  blogs.push(newBlog);

  console.log("Blog Created:", newBlog);
  res.json({ message: "Blog created successfully", blog: newBlog });
};

// Get all blogs
exports.getAllBlogs = (req, res) => {
  console.log("Fetching all bloggs");
  res.json({ message: "All blogs fetched successfully", blogs });
};

// Get single blog
exports.getBlogById = (req, res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  console.log("Single Blog Fetched:", blog);
  res.json({ message: "Blog fetched successfully", blog });
};

// Update blog
exports.updateBlog = (req, res) => {
  const { title, content } = req.body;
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  blog.updatedAt = new Date();

  console.log("Blog updated:", blog);
  res.json({ message: "Blog updated successfully", blog });
};

// Delete blog
exports.deleteBlog = (req, res) => {
  const index = blogs.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Blog not found" });

  const deleted = blogs.splice(index, 1);
  console.log("Blog Deletef:", deleted[0]);

  res.json({ message: "Blog deleted successfully" });
};
