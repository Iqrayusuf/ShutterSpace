package com.hamooth.progress.service;

import com.hamooth.progress.model.ProgressUpdate;
import com.hamooth.progress.repository.ProgressUpdateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProgressUpdateService {

    @Autowired
    private ProgressUpdateRepository repo;

    // Create
    public ProgressUpdate create(ProgressUpdate update) {
        update.setCreatedAt(LocalDateTime.now());
        return repo.save(update);
    }

    // Get all
    public List<ProgressUpdate> getAll() {
        return repo.findAll();
    }

    // Get single
    public Optional<ProgressUpdate> get(Long id) {
        return repo.findById(id);
    }

    // Update
    public ProgressUpdate update(Long id, ProgressUpdate newUpdate) {
        ProgressUpdate old = repo.findById(id).orElseThrow();
        old.setTemplateType(newUpdate.getTemplateType());
        old.setTitle(newUpdate.getTitle());
        old.setDescription(newUpdate.getDescription());
        old.setTags(newUpdate.getTags());
        old.setPrivacy(newUpdate.getPrivacy());
        return repo.save(old);
    }

    // Delete
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
