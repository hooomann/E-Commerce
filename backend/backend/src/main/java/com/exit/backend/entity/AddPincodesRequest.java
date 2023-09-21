package com.exit.backend.entity;

import java.util.List;

public class AddPincodesRequest {
    private Long productId;
    private List<String> pincodes;
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public List<String> getPincodes() {
		return pincodes;
	}
	public void setPincodes(List<String> pincodes) {
		this.pincodes = pincodes;
	}

}
