package ShutterSpace.LearningPlan_backend.entity;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "Users")

public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    @Column(length = 1000)
    private String description;


    @ElementCollection
    private List<String> topicsCovered;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")  // foreign key in Resource table
    private List<Resource> resources;


    private LocalDate startDate;

    private LocalDate targetCompletionDate;

    private String estimatedTime;  // e.g., "2 weeks"

    private String difficultyLevel; // Beginner, Intermediate, Advanced

    private String status; // Not Started, In Progress, Completed

}
