package com.exit.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.exit.backend.entity.AddPincodesRequest;
import com.exit.backend.entity.Pincode;
import com.exit.backend.entity.Product;
import com.exit.backend.service.ProductService;

@RestController
public class ProductController {
    @Autowired
    ProductService productService;

    // Endpoint for searching products
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = false, name = "productCode") String productCode,
            @RequestParam(required = false, name = "brand") String brand,
            @RequestParam(required = false, name = "name") String name) {
        List<Product> products = productService.findProductsByCodeBrandAndName(productCode, brand, name);
        return ResponseEntity.ok(products);
    }

    // Endpoint for retrieving product details
    @GetMapping("/product/{productId}")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<Product> productDetails(@PathVariable String productId) {
        Product product = productService.findProductById(Long.parseLong(productId));
        if (product != null)
            return ResponseEntity.ok(product);
        else
            return ResponseEntity.notFound().build();
    }

    // Sample endpoint for testing authorization
    @GetMapping("/check/{a}")
    @PreAuthorize("hasRole('User')")
    public String check(@PathVariable String a) {
        return "Success";
    }

    // Endpoint for checking serviceability of a product in a specific pincode
    @GetMapping("/serviceable")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<Product> getServiceablility(@RequestParam("productId") String productId,
            @RequestParam("pincode") String pincode) {
        Pincode isServiceable = productService.checkServiceability(Long.parseLong(productId), pincode);
        if (isServiceable != null)
            return ResponseEntity.ok(null);
        else
            return ResponseEntity.notFound().build();
    }

    // Endpoint for retrieving the price of a product
    @GetMapping("/{id}/price")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<Double> getProductPrice(@PathVariable Long id) {
        double price = productService.getProductPriceById(id);
        if (price != 0) {
            return ResponseEntity.ok(price);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint for adding a new product
    @PostMapping("/addproduct")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product addedProduct = productService.addProduct(product);
        return ResponseEntity.ok(addedProduct);
    }

    // Endpoint for adding pincodes to a product
    @PostMapping("/add/pincodes")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<String> addPincodesToProduct(@RequestBody AddPincodesRequest request) {
        try {
            productService.addPincodesToProduct(request.getProductId(), request.getPincodes());
            return ResponseEntity.ok("Pincodes added successfully");
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
