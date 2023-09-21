package com.exit.backend.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exit.backend.dao.PincodeDao;
import com.exit.backend.dao.ProductDao;
import com.exit.backend.entity.Pincode;
import com.exit.backend.entity.Product;

@Service
public class ProductService {

	@Autowired
	private ProductDao productRepository;

	@Autowired
	private PincodeDao pincodeDao;

	// Find products based on product code, brand, and name
	public List<Product> findProductsByCodeBrandAndName(String productCode, String brand, String name) {

		List<Product> products = productRepository.findAll();
		List<Product> results = new ArrayList<Product>();

		for (Product product : products) {
			if ((productCode == null || productCode.equalsIgnoreCase(product.getProductCode()))
					&& (brand == null || brand.equalsIgnoreCase(product.getBrand()))
					&& (name == null || name.equalsIgnoreCase(product.getName()))) {
				results.add(product);
			}
		}
		return results;
	}

	// Find a product by its ID
	public Product findProductById(long productId) {
		return productRepository.getById(productId);
	}

	// Check if a product is serviceable in a given pincode
	public Pincode checkServiceability(long productId, String pincode) {
		return pincodeDao.findByProductAndPincode(findProductById(productId), pincode);
	}

	// Get the price of a product based on its ID
	public double getProductPriceById(Long id) {
		Optional<Product> optionalProduct = productRepository.findById(id);
		if (optionalProduct.isPresent()) {
			Product product = optionalProduct.get();
			return product.getPrice();
		} else {
			return 0.0;
		}
	}

	// Add a new product to the repository
	public Product addProduct(Product product) {
		return productRepository.save(product);
	}

	// Add a list of pincodes to a product
	public void addPincodesToProduct(Long productId, List<String> pincodes) {
		Product product = productRepository.findById(productId)
				.orElseThrow();
		for (String pincode : pincodes) {
			Pincode newPincode = new Pincode();
			newPincode.setPincode(pincode);
			newPincode.setProduct(product);
			pincodeDao.save(newPincode);
		}
	}

}
