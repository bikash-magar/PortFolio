import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

function BlogEditor() {
  const { blogs, addItem, updateItem, deleteItem } = usePortfolio();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    excerpt: '',
    tags: '',
    readTime: '',
    status: 'draft'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      publishedDate: formData.status === 'published' ? new Date().toISOString() : null,
      updatedDate: new Date().toISOString()
    };

    if (editingId) {
      updateItem('blogs', editingId, blogData);
      setEditingId(null);
    } else {
      addItem('blogs', blogData);
    }
    
    setFormData({
      title: '',
      category: '',
      content: '',
      excerpt: '',
      tags: '',
      readTime: '',
      status: 'draft'
    });
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title || '',
      category: blog.category || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      tags: blog.tags ? blog.tags.join(', ') : '',
      readTime: blog.readTime || '',
      status: blog.status || 'draft'
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteItem('blogs', id);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: '',
      content: '',
      excerpt: '',
      tags: '',
      readTime: '',
      status: 'draft'
    });
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Blog Management</h1>
      
      <div className="dashboard-section">
        <h2 className="section-title">
          {editingId ? 'Edit Blog Post' : 'Add New Blog Post'}
        </h2>
        
        <form onSubmit={handleSubmit} className="entity-form">
          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter blog post title"
              />
            </div>
            
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                <option value="Development">Development</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Personal">Personal</option>
                <option value="Technology">Technology</option>
                <option value="Career">Career</option>
                <option value="Tips">Tips</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Read Time</label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                placeholder="e.g., 5 min read"
              />
            </div>
            
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows="3"
              placeholder="Brief description of the blog post (shown in previews)"
            />
          </div>

          <div className="form-group">
            <label>Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="10"
              required
              placeholder="Write your blog post content here..."
            />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Enter tags separated by commas (e.g., React, JavaScript, Tutorial)"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Blog Post' : 'Add Blog Post'}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="btn btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="dashboard-section">
        <h2 className="section-title">Existing Blog Posts ({blogs?.length || 0})</h2>
        
        {!blogs || blogs.length === 0 ? (
          <p className="no-items">No blog posts created yet.</p>
        ) : (
          <div className="entity-grid">
            {blogs.map((blog) => (
              <div key={blog.id} className="entity-card">
                <div className="entity-header">
                  <h3>{blog.title}</h3>
                  <div className="entity-meta">
                    <span className={`status-badge ${blog.status}`}>
                      {blog.status}
                    </span>
                    <span className="category-badge">{blog.category}</span>
                  </div>
                </div>
                
                <div className="entity-content">
                  <p className="excerpt">{blog.excerpt}</p>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="tags">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="blog-meta">
                    {blog.readTime && <span>📖 {blog.readTime}</span>}
                    {blog.publishedDate && (
                      <span>📅 {new Date(blog.publishedDate).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                
                <div className="entity-actions">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="btn btn-sm btn-outline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogEditor;