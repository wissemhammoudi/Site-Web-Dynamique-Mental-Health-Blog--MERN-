import React, { useState } from 'react';
import './Pagination.css'; 

const Pagination = ({ totalSlides, currentIndex, setCurrentIndex }) => {
  const [currentPage, setCurrentPage] = useState(1);


  const handleSlideChange = (index) => {
    setCurrentIndex(index);
    setCurrentPage(index + 1);
  };

  const paginationItems = [];
  const lastPageIndex = totalSlides - 1;

  if (totalSlides <= 5) {
    for (let i = 0; i < totalSlides; i++) {
      paginationItems.push(
        <div
          key={i}
          className={`pagination-circle ${i === currentIndex ? 'active' : ''}`}
          onClick={() => handleSlideChange(i)}
        >
          {i + 1}
        </div>
      );
    }
  } else {
    const displayDots = <div key="dots" className="pagination-dots">...</div>;

    let startPageIndex, endPageIndex;
    if (currentIndex < 2) {
      startPageIndex = 0;
      endPageIndex = 4;
    } else if (currentIndex >= 2 && currentIndex <= lastPageIndex - 2) {
      startPageIndex = currentIndex - 2;
      endPageIndex = currentIndex + 2;
    } else {
      startPageIndex = lastPageIndex - 4;
      endPageIndex = lastPageIndex;
    }

    for (let i = startPageIndex; i <= endPageIndex; i++) {
      paginationItems.push(
        <div
          key={i}
          className={`pagination-circle ${i === currentIndex ? 'active' : ''}`}
          onClick={() => handleSlideChange(i)}
        >
          {i + 1}
        </div>
      );
    }
    
    if (currentIndex <= lastPageIndex - 3) {
      paginationItems.push(displayDots);
    }
  }

  return (
    <div className="pagination">
      {paginationItems}
    </div>
  );
};

export default Pagination;


