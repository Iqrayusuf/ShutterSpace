package ShutterSpace.LearningPlan_backend.service;

import ShutterSpace.LearningPlan_backend.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser (UserDto userDto);

    UserDto getUserById(Long userId);

    List<UserDto> getAllUsers();

    UserDto updateUser(Long userId,UserDto updateUser);

    void deleteUser (Long userId);

}
