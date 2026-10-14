package com.example.demo.controller;

import com.example.demo.model.Student;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentservice;

    public StudentController(StudentService studentservice)
    {
        this.studentservice = studentservice;
    }

    @GetMapping
    public List<Student> getstudents()
    {
        return studentservice.GetAllStudents();
    }

    @PostMapping
    public Student newStudent(@RequestBody Student newstd)
    {
        return studentservice.CreateStudent(newstd);
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id)
    {
        return studentservice.GetStudentById(id);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable String id, @RequestBody Student updatedStudent)
    {
        return studentservice.UpdateStudent(id, updatedStudent);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable String id)
    {
        return studentservice.DeleteStudent(id);
    }

}
