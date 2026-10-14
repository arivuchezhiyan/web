package com.example.demo;

import com.example.demo.model.Student;
import com.example.demo.service.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BackendApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private StudentService studentService;

    @Test
    void testGetAllStudents() throws Exception {
        Student s1 = new Student();
        s1.setId("1");
        s1.setName("Alice");
        s1.setEmail("alice@example.com");
        s1.setAge(21);
        s1.setDepartment("Computer Science");
        s1.setAddress("123 Tech Lane");

        Student s2 = new Student();
        s2.setId("2");
        s2.setName("Bob");
        s2.setEmail("bob@example.com");
        s2.setAge(22);
        s2.setDepartment("Mechanical");
        s2.setAddress("456 Engineering Ave");

        when(studentService.GetAllStudents()).thenReturn(Arrays.asList(s1, s2));

        mockMvc.perform(get("/api/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Alice"))
                .andExpect(jsonPath("$[0].email").value("alice@example.com"))
                .andExpect(jsonPath("$[1].name").value("Bob"));
    }

    @Test
    void testGetStudentById() throws Exception {
        Student s = new Student();
        s.setId("1");
        s.setName("Alice");
        s.setEmail("alice@example.com");
        s.setAge(21);
        s.setDepartment("Computer Science");
        s.setAddress("123 Tech Lane");

        when(studentService.GetStudentById("1")).thenReturn(s);

        mockMvc.perform(get("/api/students/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Alice"))
                .andExpect(jsonPath("$.email").value("alice@example.com"))
                .andExpect(jsonPath("$.address").value("123 Tech Lane"));
    }

    @Test
    void testCreateStudent() throws Exception {
        Student savedStudent = new Student();
        savedStudent.setId("1");
        savedStudent.setName("Alice");
        savedStudent.setEmail("alice@example.com");
        savedStudent.setAge(21);
        savedStudent.setDepartment("Computer Science");
        savedStudent.setAddress("123 Tech Lane");

        when(studentService.CreateStudent(any(Student.class))).thenReturn(savedStudent);

        mockMvc.perform(post("/api/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Alice\",\"email\":\"alice@example.com\",\"age\":21,\"department\":\"Computer Science\",\"address\":\"123 Tech Lane\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Alice"))
                .andExpect(jsonPath("$.email").value("alice@example.com"));
    }

    @Test
    void testUpdateStudent() throws Exception {
        Student updatedStudent = new Student();
        updatedStudent.setId("1");
        updatedStudent.setName("Alice Updated");
        updatedStudent.setEmail("alice_new@example.com");
        updatedStudent.setAge(22);
        updatedStudent.setDepartment("IT");
        updatedStudent.setAddress("789 University Blvd");

        when(studentService.UpdateStudent(eq("1"), any(Student.class))).thenReturn(updatedStudent);

        mockMvc.perform(put("/api/students/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Alice Updated\",\"email\":\"alice_new@example.com\",\"age\":22,\"department\":\"IT\",\"address\":\"789 University Blvd\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Alice Updated"))
                .andExpect(jsonPath("$.email").value("alice_new@example.com"));
    }

    @Test
    void testDeleteStudent() throws Exception {
        when(studentService.DeleteStudent("1")).thenReturn("Student deleted successfully with id: 1");

        mockMvc.perform(delete("/api/students/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Student deleted successfully with id: 1"));
    }
}
