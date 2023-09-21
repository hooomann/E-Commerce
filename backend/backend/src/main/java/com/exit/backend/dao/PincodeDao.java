package com.exit.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exit.backend.entity.Pincode;
import com.exit.backend.entity.Product;


@Repository
public interface PincodeDao extends JpaRepository<Pincode, Long> {
    Pincode findByProductAndPincode(Product product, String pincode);
}
