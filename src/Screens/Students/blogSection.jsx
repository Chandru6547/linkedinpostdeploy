import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "./blogSection.css";

const BlogSection = ({ blogs }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showRightNav, setShowRightNav] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const categories = ["all", ...new Set(blogs.map(blog => blog.Category?.toLowerCase()))];

  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter(blog => blog.Category?.toLowerCase() === selectedCategory.toLowerCase());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateScrollNav = () => {
      const el = scrollRef.current;
      if (el) {
        setShowLeftNav(el.scrollLeft > 0);
        setShowRightNav(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
      }
    };
    if (scrollRef.current) {
      updateScrollNav();
      scrollRef.current.addEventListener("scroll", updateScrollNav);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", updateScrollNav);
      }
    };
  }, [blogs]);

  const scrollTags = (direction) => {
    const scrollAmount = 150;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(() => {
        const el = scrollRef.current;
        if (el) {
          setShowLeftNav(el.scrollLeft > 0);
          setShowRightNav(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
        }
      }, 300);
    }
  };

  const handleBlogClick = (blog) => {
    if (blog.link) {
      window.open(blog.link, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/blogs/${blog.slug}`);
    }
  };

  return (
    <div className="blogs mt-10">
      <h1 className="blogs-box">Blogs</h1>

      <div className="category-tags-container">
        {showLeftNav && (
          <button className="scroll-btn left" onClick={() => scrollTags("left")}>
            &lt;
          </button>
        )}
        <div className="tags-scroll-wrapper">
          <div className="tags-scroll" ref={scrollRef}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`tag ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {showRightNav && (
          <button className="scroll-btn right" onClick={() => scrollTags("right")}>
            &gt;
          </button>
        )}
      </div>

      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="card-swiper"
      >
        {filteredBlogs.map((blog, index) => (
          <SwiperSlide key={index}>
            <div style={{ marginBottom: isMobile ? "0px" : "60px", padding: "10px" }}>
              <div className="card4" onClick={() => handleBlogClick(blog)}>
                <div className="card-image">
                  <img
                    src={blog?.display_image?.filename || "default-image.jpg"}
                    alt="Blog"
                  />
                </div>
                <div style={{ padding: "10px" }}>
                  <div className="blog-box">{blog.Category}</div>
                  <div className="blogContent">{blog.Title}</div>
                  <br />
                  <div className="blog-author">
                    {blog.publishedDate} | {blog.readTime}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSection;
