// scripts/add-product.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".add-product-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("product-name").value.trim();
    const price = document.getElementById("product-price").value;
    const stock = document.getElementById("product-stock").value;
    const category = document.getElementById("product-category").value;
    const imageURL = document.getElementById("product-image").value.trim(); // <-- URL string

    if (!name || !price || !stock || !category) {
      alert("Please fill all fields!");
      return;
    }

    // JSON body to send
    const productData = {
      name,
      price: Number(price),
      stock: Number(stock),
      category,
      imageLink: imageURL, // <-- plain string URL
    };

    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // <-- required
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert("Error: " + data.message);
        return;
      }

      alert("Product added successfully!");
      form.reset();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to connect to the server.");
    }
  });
});
