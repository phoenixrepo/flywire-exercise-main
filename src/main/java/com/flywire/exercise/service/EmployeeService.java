package com.flywire.exercise.service;

import com.flywire.exercise.model.Employee;
import com.flywire.exercise.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private List<Employee> employees;

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostConstruct
    public void loadData() throws IOException {
        this.employees = employeeRepository.loadData();
    }

    public List<Employee> getAllEmployees() {
        return employees;
    }

    public Employee getEmployeeById(Long id) {
        return employees.stream()
                .filter(emp -> id.equals(emp.getId()))
                .findFirst()
                .orElse(null);
    }

    public List<Employee> getActiveEmployeesSortedByLastName() {
        return employees.stream()
                .filter(Employee::isActive)
                .sorted(Comparator.comparing(Employee::getLastName, String.CASE_INSENSITIVE_ORDER))
                .collect(Collectors.toList());
    }

    public Map<String, Object> getEmployeeWithDirectHires(Long id) {
        Employee employee = getEmployeeById(id);
        if (employee == null) {
            return null;
        }

        List<String> directHireNames = Optional.ofNullable(employee.getDirectReports())
                .orElse(Collections.emptyList())
                .stream()
                .map(directReportId -> getEmployeeById(directReportId))
                .filter(Objects::nonNull)
                .map(Employee::getName)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("employee", employee);
        response.put("directHires", directHireNames);
        return response;
    }

    public List<Employee> getEmployeesHiredInRange(Date startDate, Date endDate) {
        return employees.stream()
                .filter(e -> {
                    Date hireDate = e.getHireDate();
                    System.out.println("Hire - " + hireDate);
                    System.out.println("Start - " + startDate);
                    System.out.println(hireDate.after(startDate));
                    return hireDate != null && !hireDate.after(endDate) && !hireDate.before(startDate);
                })
                .sorted((e1, e2) -> e2.getHireDate().compareTo(e1.getHireDate()))
                .collect(Collectors.toList());
    }

    public String createEmployee(Employee newEmployee) throws IOException {
        if (newEmployee.getName() == null || newEmployee.getName().trim().isEmpty()) {
            return "Name is required";
        }
        if (newEmployee.getHireDate() == null) {
            return "Hire date is required";
        }
        if (newEmployee.getPosition() == null || newEmployee.getPosition().trim().isEmpty()) {
            return "Position is required";
        }
        if (newEmployee.getId() == null || newEmployee.getId() <= 0) { // *** This can be ignored if a database with an auto-incrementing primary key is used.
            return "Valid ID is required";
        }
        if (getEmployeeById(newEmployee.getId()) != null) {
            return "Employee ID already exists";
        }

        if (newEmployee.getDirectReports() == null) {
            newEmployee.setDirectReports(new ArrayList<>());
        }
        newEmployee.setActive(true);

        employees.add(newEmployee);
        employeeRepository.saveData(employees);

        return "success";
    }

    public String deactivateEmployee(Long id) throws IOException {
        Employee employee = getEmployeeById(id);
        if (employee == null) {
            return "not_found";
        }
        if (!employee.isActive()) {
            return "already_inactive";
        }

        employee.setActive(false);
        employeeRepository.saveData(employees);
        return "success";
    }
}
