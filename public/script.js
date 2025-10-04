const API = "http://localhost:5000/api/blogs";

// Fetchs all the bloga
async function loadBlogs() {
  console.log("Fetching blogs");
  try {
    let res = await fetch(API);
    let data = await res.json();

    let blogs = data.blogs;
    let blogsDiv = document.getElementById("blogs");
    blogsDiv.innerHTML = "";

    if (blogs.length === 0) {
      blogsDiv.innerHTML = "<p>No blogs available.</p>";
    }

    blogs.forEach(blog => {
      blogsDiv.innerHTML += `
        <div class="blog" id="blog-${blog.id}">
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <small>By ${blog.author}</small><br>
            <button onclick="showEditForm(${blog.id})">Edit</button>
            <button onclick="deleteBlog(${blog.id})">Delete</button>
            <button onclick="getBlog(${blog.id})">View</button>
            
            <div id="edit-form-${blog.id}" style="display:none; margin-top:10px;">
              <input id="edit-title-${blog.id}" value="${blog.title}" />
              <textarea id="edit-content-${blog.id}">${blog.content}</textarea>
              <button onclick="updateBlog(${blog.id})">Save</button>
              <button onclick="hideEditForm(${blog.id})">Cancel</button>
            </div>
        </div>
      `;
    });

    console.log("Blogs loaded:", blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
  }
}

// Create a blog
async function createBlog() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;
  let author = document.getElementById("author").value;

  if (!title || !content || !author) {
    alert("Please fill all fields!");
    return;
  }

  try {
    let res = await fetch(API + "/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, author })
    });
    let data = await res.json();
    console.log("Blog created:", data.blog);
    loadBlogs();

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("author").value = "";

  } catch (err) {
    console.error("Error creating blog:", err);
  }
}

// Deletes blogs
async function deleteBlog(id) {
  if (!confirm("Are you sure you want to delete this blog?")) return;

  try {
    let res = await fetch(`${API}/delete/${id}`, { method: "DELETE" });
    let data = await res.json();
    console.log("Blog deleted:", data);
    loadBlogs();
  } catch (err) {
    console.error("Error delting blog:", err);
  }
}

// Show edit form
function showEditForm(id) {
  document.getElementById(`edit-form-${id}`).style.display = "block";
}

// Hide edit form
function hideEditForm(id) {
  document.getElementById(`edit-form-${id}`).style.display = "none";
}

// Updates blogs
async function updateBlog(id) {
  let title = document.getElementById(`edit-title-${id}`).value;
  let content = document.getElementById(`edit-content-${id}`).value;

  if (!title || !content) {
    alert("Please fill all fields!");
    return;
  }

  try {
    let res = await fetch(`${API}/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
    let data = await res.json();
    console.log("Blog updated:", data.blog);
    hideEditForm(id);
    loadBlogs();
  } catch (err) {
    console.error("Error updating blog:", err);
  }
}

// Shows a single blog
async function getBlog(id) {
    let res = await fetch(`${API}/${id}`);
    let data = await res.json();

    if (data.blog) {
        alert(`Title: ${data.blog.title}\nContent: ${data.blog.content}\nAuthor: ${data.blog.author}`);
    } else {
        alert("Blog not found");
    }
}

// Load blogs at startup
loadBlogs();
