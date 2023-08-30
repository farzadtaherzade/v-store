import axios from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAuthStore } from "./auth";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const product = ref({});
  const carts = ref([]);
  const checkouts = ref([]);

  carts.value = getItemToLocal("carts");

  const shopLength = computed(() => carts.value.length);
  const totalPrice = computed(() =>
    carts.value.reduce((p, c) => {
      return c.price * c.quantity + p;
    }, 0)
  );

  async function getAllProducts() {
    const results = await axios.get("/product/list");
    products.value = results.data.products;
    return products.value;
  }

  async function getAllCheckouts() {
    const results = await axios.get("/checkout/list");
    console.log(results.data.checkouts);
    checkouts.value = results.data.checkouts;
    return checkouts.value;
  }

  async function addnewCheckout() {
    const authStore = useAuthStore();
    axios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${authStore.returnToken}`;

    const cartItems = [];
    carts.value.map((cart) =>
      cartItems.push({
        product: cart.title,
        quantity: cart.quantity,
        price: cart.price,
      })
    );
    const result = await axios.post("/checkout/add", {
      cartItems,
      totalAmount: totalPrice.value,
    });
    if (result.status === 201) {
      carts.value = [];
      setItemToLocal("carts", JSON.stringify(carts.value));
    }
    return result.data;
  }

  async function getOneProduct(slug) {
    const results = await axios.get(`/product/${slug}`);
    console.log("result: ", results.data.product);
    product.value = results.data.product;
    return product.value;
  }

  async function addToCart(slug) {
    await getAllProducts();
    let product = (products.value || []).find((item) => item.slug === slug);
    if (!findProductInCarts(product.slug)) {
      Object.assign(product, { quantity: 1 });

      carts.value.push(product);
      setItemToLocal("carts", JSON.stringify(carts.value));
    }
  }

  function findProductInCarts(slug) {
    return carts.value.some((cart) => cart.slug === slug);
  }

  function increaseQuantity(slug) {
    const cart = carts.value.findIndex((item) => item.slug === slug);
    carts.value[cart].quantity++;
    setItemToLocal("carts", JSON.stringify(carts.value));
  }

  function decreaseQuantity(slug) {
    const cart = carts.value.findIndex((item) => item.slug === slug);
    carts.value[cart].quantity--;
    if (carts.value[cart].quantity <= 0) {
      carts.value = carts.value.filter((item) => item.quantity > 0);
    }
    setItemToLocal("carts", JSON.stringify(carts.value));
  }

  function setItemToLocal(name, str) {
    localStorage.setItem(name, str);
  }

  function getItemToLocal(name) {
    const data = JSON.parse(localStorage.getItem(name));
    return data || [];
  }

  return {
    products,
    carts,
    product,
    getAllProducts,
    addToCart,
    setItemToLocal,
    shopLength,
    findProductInCarts,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    getOneProduct,
    addnewCheckout,
    getAllCheckouts,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
