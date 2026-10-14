package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "students")
public class Student {
    @Id
    public String id;

    public String name;
    public String email;
    public Integer age;
    public String department;
    public String address;
}
