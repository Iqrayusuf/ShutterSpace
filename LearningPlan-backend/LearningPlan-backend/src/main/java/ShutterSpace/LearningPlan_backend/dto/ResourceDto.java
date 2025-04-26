package ShutterSpace.LearningPlan_backend.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class ResourceDto {

    private Long id;
    private String type;
    private String url;
}
