package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.BillingRequestDto;
import com.yourorg.appname.dto.response.BillingResponseDto;
import com.yourorg.appname.service.BillingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/billing")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }


    @GetMapping
    public ResponseEntity<List<BillingResponseDto>> getAllBillings(
            @RequestParam(required = false) String paymentStatus) {
        List<BillingResponseDto> billings = billingService.getAllBillings(paymentStatus);
        return ResponseEntity.ok(billings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BillingResponseDto> getBillingById(@PathVariable Long id) {
        BillingResponseDto billing = billingService.getBillingById(id);
        return ResponseEntity.ok(billing);
    }

    @PostMapping
    public ResponseEntity<BillingResponseDto> createBilling(@Valid @RequestBody BillingRequestDto request) {
        BillingResponseDto created = billingService.createBilling(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PostMapping("/{id}/payment")
    public ResponseEntity<BillingResponseDto> recordPayment(
            @PathVariable Long id,
            @RequestParam BigDecimal amountPaid,
            @RequestParam(required = false, defaultValue = "Credit Card") String paymentMethod) {
        BillingResponseDto updated = billingService.recordPayment(id, amountPaid, paymentMethod);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getBillingSummary() {
        Map<String, Object> summary = billingService.getBillingSummary();
        return ResponseEntity.ok(summary);
    }
}
