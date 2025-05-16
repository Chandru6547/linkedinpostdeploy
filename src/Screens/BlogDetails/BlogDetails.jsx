  import React, { useEffect, useState } from "react";
  import { useParams, Link } from "react-router-dom";
  import { FaLinkedin, FaWhatsapp, FaPinterest, FaTwitter } from "react-icons/fa";
  import { Helmet } from "react-helmet-async";  // Import Helmet for SEO
  import "./BlogDetails.scss";
  import Header from "../../Components/Header";
  import Footer from "../Footer";
  import { FaArrowRight } from "react-icons/fa";
  import { render } from "storyblok-rich-text-react-renderer";

  const BlogDetails = ({ blogs }) => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    useEffect(() => {
      if (blogs && blogs.length > 0) {
        const foundBlog = blogs.find((b) => b.slug === slug);
        setBlog(foundBlog || null);

        if (foundBlog) {
          const related = blogs.filter((b) => b.slug !== slug).slice(0, 3);
          setRelatedBlogs(related);
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [slug, blogs]);

    if (!blog) return <p className="loading">Blog not found!</p>;
    const shareUrl = window.location.href;
    const shareText = encodeURIComponent(
      `${blog.Title} - ${blog.metaDescription || "Check out this amazing blog!"}`
    );
    const imageUrl = blog.display_image?.filename;
    

    return (
      <div className="Container">
        <Helmet>
          <title>{`${blog.Title} | Awesome Blog Platform`}</title>
          <meta name="description" content={blog.metaDescription || blog.Title} />
          <meta name="keywords" content={`${blog.Category}, ${blog.Title}, blogging`} />
          <meta property="og:title" content={blog.Title} />
          <meta property="og:description" content={blog.metaDescription || blog.Title} />
          <meta property="og:image" content={imageUrl || '/default-thumbnail.jpg'} />
          <meta property="og:url" content={shareUrl} />
          <meta property="og:type" content="article" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={blog.Title} />
          <meta property="twitter:description" content={blog.metaDescription || blog.Title} />
          <meta property="twitter:image" content={imageUrl || '/default-thumbnail.jpg'} />
        </Helmet>
        <Header/>
        <div className="blog-container">
          <h1 className="blog-title">{blog.Title}</h1>
          {/* <p className="author-info">By {blog.aboutTheAuthor}</p>  */}
          <div className="blog-content">{render(blog.BlogContent)}</div>
        </div>
        <div className="share-container">
          <div className="share-buttons">
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn linkedin"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn whatsapp"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn pinterest"
            >
              <FaPinterest size={24} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn twitter"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="related-articles">
            <h2 className="hh1">Related Articles</h2>
            <div className="related-grid">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog.slug} to={`/blogs/${relatedBlog.slug}`} className="related-card">
                <img src={relatedBlog.display_image?.filename || "/default-thumbnail.jpg"} alt={relatedBlog.Title} />
                <div className="related-content">
                  <h3>{relatedBlog.Title}</h3>
                  <p className="category">
                    {relatedBlog.Category}
                  </p>
                  <p className="readtime"> {relatedBlog.publishedDate} | {relatedBlog.readTime}</p>
                </div>
              </Link>              
              ))}
            </div>
          </div>
        )}
        <Footer/>
      </div>
    );
  };

  export default BlogDetails;
