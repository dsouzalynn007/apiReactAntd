
export const PaginationHelper=(arrayFromComp)=>{

function calculatePageSize(arrayLength) {
    // Define your desired ratio (e.g., 0.1 for 10% of the array length)
    const ratio = 0.1;

    // Calculate the page size based on the ratio and array length
    const pageSize = Math.ceil(arrayLength * ratio);

    // Ensure a minimum page size to avoid empty or very small pages
    const minimumPageSize = 0;

    return pageSize
}

function getPages(array, pageSize) {
    const totalItems = array.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    // You can then implement logic to get a specific page or iterate through all pages
    // ...

    return totalPages;
}

// Example usage:
const myArray = arrayFromComp

// Calculate dynamic page size based on array length
const dynamicPageSize = calculatePageSize(myArray.length);

// Use the dynamic page size for pagination
const totalPages = getPages(myArray, dynamicPageSize);

// console.log("Dynamic Page Size:", dynamicPageSize);
// console.log("Total Pages:", totalPages);

return { size:dynamicPageSize, pages:totalPages}
}
