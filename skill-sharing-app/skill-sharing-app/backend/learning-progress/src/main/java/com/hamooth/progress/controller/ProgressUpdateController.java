package com.hamooth.progress.controller;

import com.hamooth.progress.model.ProgressUpdate;
import com.hamooth.progress.service.ProgressUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin("*") // Allow frontend to call
public class ProgressUpdateController {

    @Autowired
    private ProgressUpdateService service;

    // Create
    @PostMapping
    public ProgressUpdate create(@RequestBody ProgressUpdate update) {
        return service.create(update);
    }

    // Read all
    @GetMapping("/user")
    public List<ProgressUpdate> getAll() {
        return service.getAll();
    }

    // Read one
    @GetMapping("/{id}")
    public Optional<ProgressUpdate> get(@PathVariable Long id) {
        return service.get(id);
    }

    // Update
    @PutMapping("/{id}")
    public ProgressUpdate update(@PathVariable Long id, @RequestBody ProgressUpdate update) {
        return service.update(id, update);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
