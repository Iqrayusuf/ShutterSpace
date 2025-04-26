package ShutterSpace.LearningPlan_backend.repository;

import ShutterSpace.LearningPlan_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User,Long > {


}
