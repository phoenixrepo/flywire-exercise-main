package com.flywire.exercise.repository;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flywire.exercise.model.Employee;

@Repository
public class EmployeeRepository {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("classpath:json/data.json")
    private File dataFile;

    @PostConstruct
    public List<Employee> loadData() throws IOException {
        List<Employee> employees = objectMapper.readValue(dataFile, new TypeReference<List<Employee>>() {
        });
        return employees;
    }

    public void saveData(List<Employee> employees) throws IOException {
        System.out.println("Data file path: " + dataFile.getAbsolutePath());
        System.out.println("Writing to file...");
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(dataFile, employees);
        System.out.println("Write complete.");
    }
}
