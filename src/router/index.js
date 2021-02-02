import VueRouter from "vue-router";
import index from "../views/index/index.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
    redirect: "/order",
    children: [
      {
        path: "order",
        component: () => import("../views/order/index"),
        name: "order",
        redirect: "/bill",
        children: [
          {
            path: "/bill",
            component: () => import("../views/bill/index"),
            name: "bill"
          },
          {
            path: "/supplier",
            component: () => import("../views/supplier/index"),
            name: "supplier"
          },
          {
            path: "/produce",
            component: () => import("../views/produce/index"),
            name: "produce"
          },
          {
            path: "/receipts",
            component: () => import("../views/receipts/index"),
            name: "receipts"
          },
          {
            path: "/payments",
            component: () => import("../views/payments/index"),
            name: "payments"
          },
          {
            path: "/producePayments",
            component: () => import("../views/producePayments/index"),
            name: "producePayments"
          },
          {
            path: "/payments_total",
            component: () => import("../views/payments_total/index"),
            name: "payments_total"
          },
          {
            path: "/payments_total_2",
            component: () => import("../views/payments_total/produce"),
            name: "payments_total_2"
          }
           
        ]
      },
      {
        path: "me",
        component: () => import("../views/me/index"),
        name: "me"
      }
    ]
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
