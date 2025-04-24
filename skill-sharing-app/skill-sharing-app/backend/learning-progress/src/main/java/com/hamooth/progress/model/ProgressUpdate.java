package com.hamooth.progress.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class ProgressUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String templateType;
    private String title;
    private String description;
    private String tags;
    private String privacy; // Public / Private / Mentor Only
    private LocalDateTime createdAt;
    private String screenshot;
}
