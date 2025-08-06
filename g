[1mdiff --git a/src/components/Products.jsx b/src/components/Products.jsx[m
[1mindex 8046e09..9e24db5 100644[m
[1m--- a/src/components/Products.jsx[m
[1m+++ b/src/components/Products.jsx[m
[36m@@ -1,4 +1,4 @@[m
[31m-import { useState } from 'react';[m
[32m+[m[32mimport React, { useState } from 'react';[m
 import { useCart } from '../context/CartContext';[m
 import { useSearch } from '../context/SearchContext';[m
 import './Products.css';[m
[36m@@ -112,11 +112,16 @@[m [mconst Products = () => {[m
   ];[m
 [m
   const categories = [[m
[31m-    { id: 'src', name: 'src/' }[m
[32m+[m[32m    { id: 'all', name: 'All Products' },[m
[32m+[m[32m    { id: 'bath', name: 'Bath' },[m
[32m+[m[32m    { id: 'kitchen', name: 'Kitchen' },[m
[32m+[m[32m    { id: 'pets', name: 'Pets' },[m
[32m+[m[32m    { id: 'sale', name: 'Sale' },[m
[32m+[m[32m    { id: 'new', name: 'New&Trending' }[m
   ];[m
 [m
   // First filter by category[m
[31m-  let filteredProducts = selectedCategory === 'src' [m
[32m+[m[32m  let filteredProducts = selectedCategory === 'all'[m[41m [m
     ? products [m
     : products.filter(product => product.category === selectedCategory);[m
 [m
