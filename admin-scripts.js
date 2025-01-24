function showAddProductForm() {
    document.getElementById("add-product-form").style.display = "block";
}

function addProduct(event) {
    event.preventDefault();
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productDescription = document.getElementById("productDescription").value;

    // This is where you'd typically send data to your backend
    console.log("Product Added:", productName, productPrice, productDescription);

    document.getElementById("add-product-form").style.display = "none";
    alert("Product added successfully!");
    
}
