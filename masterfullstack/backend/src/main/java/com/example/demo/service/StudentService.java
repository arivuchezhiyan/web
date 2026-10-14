package com.example.demo.service;

import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentrepository;

    public StudentService(StudentRepository studentrepository) {
        this.studentrepository = studentrepository;
    }

    public List<Student> GetAllStudents() {
        return studentrepository.findAll();
    }

    public Student CreateStudent(Student newStudent) {
        return studentrepository.save(newStudent);
    }

    public Student GetStudentById(String id) {
        return studentrepository.findById(id).orElse(null);
    }

    public Student UpdateStudent(String id, Student updatedStudent) {
        Student existingStudent = studentrepository.findById(id).orElse(null);
        if (existingStudent != null) {
            existingStudent.setName(updatedStudent.getName());
            existingStudent.setEmail(updatedStudent.getEmail());
            existingStudent.setAge(updatedStudent.getAge());
            existingStudent.setDepartment(updatedStudent.getDepartment());
            existingStudent.setAddress(updatedStudent.getAddress());
            return studentrepository.save(existingStudent);
        }
        return null;
    }

    public String DeleteStudent(String id) {
        studentrepository.deleteById(id);
        return "Student deleted successfully with id: " + id;
    }
}
