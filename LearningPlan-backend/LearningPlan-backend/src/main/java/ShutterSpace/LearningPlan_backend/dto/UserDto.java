package ShutterSpace.LearningPlan_backend.dto;

import ShutterSpace.LearningPlan_backend.entity.Resource;
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

public class UserDto {

    private long id;
    private String title;
    private String description;
    private List<String> topicsCovered;
    private List<ResourceDto> resources;
    private LocalDate startDate;
    private LocalDate targetCompletionDate;
    private String estimatedTime;  // e.g., "2 weeks"
    private String difficultyLevel; // Beginner, Intermediate, Advanced
    private String status; // Not Started, In Progress, Completed
}
