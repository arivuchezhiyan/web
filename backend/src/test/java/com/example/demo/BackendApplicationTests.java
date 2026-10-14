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

        Student s2 = new Student();
        s2.setId("2");
        s2.setName("Bob");

        when(studentService.GetAllStudents()).thenReturn(Arrays.asList(s1, s2));

        mockMvc.perform(get("/api/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Alice"))
                .andExpect(jsonPath("$[1].name").value("Bob"));
    }

    @Test
    void testGetStudentById() throws Exception {
        Student s = new Student();
        s.setId("1");
        s.setName("Alice");

        when(studentService.GetStudentById("1")).thenReturn(s);

        mockMvc.perform(get("/api/students/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Alice"));
    }

    @Test
    void testCreateStudent() throws Exception {
        Student savedStudent = new Student();
        savedStudent.setId("1");
        savedStudent.setName("Alice");

        when(studentService.CreateStudent(any(Student.class))).thenReturn(savedStudent);

        mockMvc.perform(post("/api/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Alice\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Alice"));
    }

    @Test
    void testUpdateStudent() throws Exception {
        Student updatedStudent = new Student();
        updatedStudent.setId("1");
        updatedStudent.setName("Alice Updated");

        when(studentService.UpdateStudent(eq("1"), any(Student.class))).thenReturn(updatedStudent);

        mockMvc.perform(put("/api/students/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Alice Updated\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Alice Updated"));
    }

    @Test
    void testDeleteStudent() throws Exception {
        when(studentService.DeleteStudent("1")).thenReturn("Student deleted successfully with id: 1");

        mockMvc.perform(delete("/api/students/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Student deleted successfully with id: 1"));
    }

}
