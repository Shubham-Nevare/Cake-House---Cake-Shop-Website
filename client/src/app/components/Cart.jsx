"use client";

import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const Cart = ({ showInline = true }) => {
  const {
    items,
    total,
    removeFromCart,
    updateQuantity,
    removeProductById,
    clearCart,
    open,
    closeCart,
    openCart,
    totalItems,
  } = useCart();
  const toast = useToast();

  // Inline summary used in the page toolbar
  const Inline = () => (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        Items: <strong>{totalItems}</strong>
      </div>
      <div className="text-sm">
        Total: <strong>₹{total.toFixed(2)}</strong>
      </div>
      <button
        onClick={openCart}
        className="ml-2 px-3 py-1 bg-pastel-pink text-chocolate-brown rounded-full"
      >
        Checkout
      </button>
    </div>
  );

  return (
    <>
      {showInline && <Inline />}

      {/* Drawer */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 ${
          open ? "z-60 pointer-events-auto" : "z-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            open ? "opacity-100 z-50" : "opacity-0"
          }`}
          onClick={closeCart}
        />

        {/* make the drawer fixed and on a higher z-index so it appears above the header/navbar */}
        <aside
          className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-60 transition-transform transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 flex items-center justify-between border-b">
            <h3 className="text-lg font-bold text-chocolate-brown">
              Your Cart
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  clearCart();
                  toast.show("Cart cleared", { type: "warn" });
                }}
                className="text-sm px-3 py-1 rounded-lg bg-red-100 text-red-600 cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="px-3 py-1 rounded-lg bg-gray-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>

          <div className="p-6 overflow-auto h-[calc(100%-200px)]">
            {items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {items.map((it, idx) => (
                  <li key={it.id ?? idx} className="flex items-center gap-3">
                    <img
                      src={it.product?.image || it.image}
                      alt={it.product?.name || it.name}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-chocolate-brown">
                        {it.product?.name || it.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {it.product?.category || it.category}
                      </div>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 border rounded-full px-2 py-1 bg-gray-50">
                      <button
                        onClick={() =>
                          updateQuantity(idx, (it.quantity || 1) - 1)
                        }
                        className="px-1 py-1 text-sm cursor-pointer"
                      >
                        −
                      </button>
                      <div className="px-2 py-1 text-sm font-semibold">
                        {it.quantity || 1}
                      </div>
                      <button
                        onClick={() =>
                          updateQuantity(idx, (it.quantity || 1) + 1)
                        }
                        className="px-1 py-1 text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-sm font-bold">
                      ₹
                      {(
                        (it.product?.price || it.price || 0) *
                        (it.quantity || 1)
                      ).toFixed(2)}
                    </div>
                    <button
                      onClick={() => {
                        // remove entire product entry instead of decrementing
                        const idToRemove = it.id ?? it.product?.id;
                        if (idToRemove != null) removeProductById(idToRemove);
                        toast.show("Removed item from cart", { type: "info" });
                      }}
                      aria-label="Remove item"
                      title="Remove"
                      className="ml-2 w-8 h-8 flex items-center justify-center rounded-full text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      <span className="text-lg leading-none">✕</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className=" p-6 border-t">
            <div className="flex items-center justify-between ">
              <div className="text-sm text-gray-600">Subtotal</div>
              <div className="text-xl font-bold">₹{total.toFixed(2)}</div>
            </div>
            <button
              onClick={() =>
                toast.show("Checkout is not set up in dev preview", {
                  type: "info",
                })
              }
              className="w-full py-3 rounded-full bg-chocolate-brown text-black font-semibold cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Cart;
