package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.BillingRequestDto;
import com.yourorg.appname.dto.response.BillingResponseDto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface BillingService {
    List<BillingResponseDto> getAllBillings(String paymentStatus);
    BillingResponseDto getBillingById(Long id);
    BillingResponseDto createBilling(BillingRequestDto request);
    BillingResponseDto recordPayment(Long id, BigDecimal amountPaid, String paymentMethod);
    Map<String, Object> getBillingSummary();
}
