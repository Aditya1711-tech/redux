package com.example.demo.controller;

import com.example.demo.entity.Task;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("*")
public class TaskRestController {
    private final List<Task> tasks = new ArrayList<>();

    @PostMapping("/addTask")
    public ResponseEntity<?> addNewTask(@RequestBody Task task){
        task.setTaskId(tasks.size()+1);
        tasks.add(task);
        return new ResponseEntity<>("Task Added successfully", HttpStatus.CREATED);
    }

    @GetMapping("/getAllTasks")
    public ResponseEntity<List<Task>> getAllTasks(){
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<?> getTaskByID(@PathVariable(name = "taskId") Integer taskId){
        for(Task task:tasks){
            if(Objects.equals(task.getTaskId(), taskId)) return new ResponseEntity<>(task, HttpStatus.OK);;
        }
        return new ResponseEntity<>("Task with given id not found", HttpStatus.NOT_FOUND);
    }
}
