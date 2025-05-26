package com.flywire.exercise.controller;

import com.flywire.exercise.model.Employee;
import com.flywire.exercise.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // 1: Get all active employees sorted by last name
    @GetMapping("/active")
    public List<Employee> getActiveEmployees() {
        return employeeService.getActiveEmployeesSortedByLastName();
    }

    // 2: Get employee by ID with direct hires' names
    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {
        Map<String, Object> result = employeeService.getEmployeeWithDirectHires(id);
        if (result == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }
        return ResponseEntity.ok(result);
    }

    // 3: Get employees hired in date range sorted by descending hire date
    @GetMapping("/hired")
    public List<Employee> getEmployeesHiredInRange(
            @RequestParam @DateTimeFormat(pattern = "MM/dd/yyyy") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "MM/dd/yyyy") Date endDate) {
        return employeeService.getEmployeesHiredInRange(startDate, endDate);
    }

    // 4: Create a new employee
    @PostMapping
    public ResponseEntity<String> createEmployee(@RequestBody Employee newEmployee) {
        try {
            String result = employeeService.createEmployee(newEmployee);
            if ("success".equals(result)) {
                return ResponseEntity.status(HttpStatus.CREATED).body("Employee created successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create employee: " + e.getMessage());
        }
    }

    // 5: Deactivate employee by ID
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<String> deactivateEmployee(@PathVariable Long id) {
        try {
            String result = employeeService.deactivateEmployee(id);
            switch (result) {
                case "success":
                    return ResponseEntity.ok("Employee deactivated successfully");
                case "not_found":
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
                case "already_inactive":
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee is already inactive");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unknown error");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to deactivate employee: " + e.getMessage());
        }
    }
}
