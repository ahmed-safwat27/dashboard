// عناصر الإدخال
const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const countInput = document.getElementById("productCount");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const productTableBody = document.getElementById("productTableBody");
const infoText = document.querySelector(".title-info p:nth-child(2)");

// عناصر القائمة الجانبية
const menuBtn = document.querySelector(".menu-btn i"); // ربط الزر بالأيقونة مباشرة
const menu = document.querySelector(".menu"); // ربط القائمة الجانبية
const content = document.querySelector(".contect");

// بيانات المنتجات
let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

// عرض المنتجات عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

// إضافة أو تعديل منتج
window.addOrUpdateProduct = () => {
  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const count = parseInt(countInput.value);

  if (!name || isNaN(price) || isNaN(count)) {
    alert("من فضلك املأ كل البيانات بشكل صحيح.");
    return;
  }

  const product = { name, price, count };

  if (editIndex !== null) {
    products[editIndex] = product;
    editIndex = null;
  } else {
    products.push(product);
  }

  saveAndRender();
  clearInputs();
};

// حذف منتج
window.deleteProduct = (index) => {
  if (confirm("هل أنت متأكد أنك تريد حذف المنتج؟")) {
    products.splice(index, 1);
    saveAndRender();
  }
};

// تعديل منتج
window.editProduct = (index) => {
  const product = products[index];
  nameInput.value = product.name;
  priceInput.value = product.price;
  countInput.value = product.count;
  editIndex = index;
  nameInput.focus();
};

// عرض المنتجات في الجدول
function renderProducts(filtered = products) {
  productTableBody.innerHTML = "";

  filtered.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${product.name}</td>
            <td><span class="price">$${product.price.toFixed(2)}</span></td>
            <td><span class="count">${product.count}</span></td>
            <td class="actions">
                <button onclick="editProduct(${index})"><i class="fas fa-pen"></i></button>
                <button onclick="deleteProduct(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
    productTableBody.appendChild(row);
  });

  updateProductCount(filtered.length);
}

// حفظ البيانات في localStorage وعرضها
function saveAndRender() {
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

// مسح الحقول بعد الإضافة/التعديل
function clearInputs() {
  nameInput.value = "";
  priceInput.value = "";
  countInput.value = "";
}

// تحديث عدد المنتجات
function updateProductCount(count) {
  infoText.textContent = `(عدد المنتجات: ${count})`;
}

// البحث عن منتج
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = products.filter((p) => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// قائمة جانبية
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
  // يمكنك إضافة تأثير على الكونتنت إذا أردت
});

// عند تحميل الصفحة، إذا كان هناك اسم مستخدم مخزن في localStorage، أظهره في البروفايل
const profileName = document.querySelector(".profile h2");
const storedName = localStorage.getItem("username");
if (profileName) {
  if (storedName) {
    profileName.textContent = storedName;
  } else {
    profileName.textContent = "";
  }
}
