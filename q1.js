document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");
  
  
    function filterGallery(filterValue) {
      let visibleCount = 0;
  
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        const shouldShow = filterValue === "all" || category === filterValue;
  
        if (shouldShow) {
          item.classList.remove("hidden");
          visibleCount++;
        } else {
          item.classList.add("hidden");
        }
      });
    }
  
    
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
     
        filterButtons.forEach((btn) => btn.classList.remove("active"));
  
   
        button.classList.add("active");
  
    
        const filterValue = button.getAttribute("data-filter");
        filterGallery(filterValue);
      });
  
     
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); 
          button.click();
        }
      });
    });
  });