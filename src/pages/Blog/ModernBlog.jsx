import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './ModernBlog.css';

function ModernBlog() {
  const { blogs } = usePortfolio();
  const navigate = useNavigate();

  // If you're still seeing issues, uncomment this line temporarily to reset data:
  // useEffect(() => { resetData(); }, []);

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Recently';
    }
    
    try {
      const date = new Date(dateString);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return 'Recently';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.warn('Date formatting error:', error);
      return 'Recently';
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      published: '#10b981',
      draft: '#f59e0b',
      archived: '#6b7280'
    };
    
    return (
      <span 
        className="blog-status"
        style={{ 
          backgroundColor: statusColors[status] || '#6b7280',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: '500'
        }}
      >
        {status}
      </span>
    );
  };

  const publishedBlogs = blogs.filter(blog => blog.status === 'published');

  const handleCreateBlog = () => {
    // Removed dashboard redirect - blog creation functionality disabled for public view
    console.log('Blog creation is only available in dashboard');
  };

  const handleReadMore = (blogId) => {
    // Removed dashboard redirect - blog reading functionality disabled for public view
    console.log('Blog reading functionality coming soon');
  };

  return (
    <div className="modern-blog">
      {/* Blog Hero */}
      <section className="blog-hero">
        <div className="page-container">
          <h1>Blog & Articles</h1>
          <p>Thoughts, insights, and experiences from my development journey.</p>
          {publishedBlogs.length === 0 && (
            <div className="blog-cta">
              <p className="no-blogs-message">No blog posts available yet. Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-content">
        <div className="blog-container">
          <div className="blog-grid">
            {publishedBlogs.length > 0 ? (
              publishedBlogs.map((blog, index) => (
                <article key={blog.id} className={`blog-card ${index === 0 ? 'featured' : ''}`}>
                  <div className="blog-header">
                    <span className="blog-category">{blog.category}</span>
                    <span className="blog-date">{formatDate(blog.publishedDate || blog.updatedDate)}</span>
                    {getStatusBadge(blog.status)}
                  </div>
                  {index === 0 ? <h2>{blog.title}</h2> : <h3>{blog.title}</h3>}
                  <p>{blog.excerpt}</p>
                  <div className="blog-footer">
                    <span className="read-time">5 min read</span>
                    <button 
                      className="read-more-btn"
                      onClick={() => handleReadMore(blog.id)}
                    >
                      Read More
                    </button>
                  </div>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="blog-tags">
                      {blog.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </article>
              ))
            ) : (
              // Show message when no published blogs are available
              <div className="no-blogs-content">
                <div className="no-blogs-icon">
                  <i className="fas fa-edit"></i>
                </div>
                <h3>No Blog Posts Yet</h3>
                <p>Check back soon for new content and articles!</p>
                
                {/* Optional: Show some example content */}
                <div className="example-blogs">
                  <h4>What you can expect to read about:</h4>
                  <div className="example-topics">
                    <span className="topic-tag">Web Development Tips</span>
                    <span className="topic-tag">Project Showcases</span>
                    <span className="topic-tag">Learning Journey</span>
                    <span className="topic-tag">Tech Reviews</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ModernBlog;