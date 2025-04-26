package ShutterSpace.LearningPlan_backend.service;

import ShutterSpace.LearningPlan_backend.dto.UserDto;
import ShutterSpace.LearningPlan_backend.entity.User;
import ShutterSpace.LearningPlan_backend.exception.ResourceNotFoundException;
import ShutterSpace.LearningPlan_backend.mapper.ResourceMapper;
import ShutterSpace.LearningPlan_backend.mapper.UserMapper;
import ShutterSpace.LearningPlan_backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class UserServiceImpl implements UserService{
    private UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        User createUser = userRepository.save(user);


        return UserMapper.mapToUserDto(createUser);
    }

    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResolutionException("User is not exist with given Id: "+ userId));
        return  UserMapper.mapToUserDto(user);


    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) ->UserMapper.mapToUserDto(user)).collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(Long userId, UserDto updateUser) {
        User user = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("User is not exist with the given Id:"+userId));


        user.setTitle(updateUser.getTitle());
        user.setDescription(updateUser.getDescription());
        user.setTopicsCovered(updateUser.getTopicsCovered());
        // clear and re-add instead of replacing
        user.getResources().clear();
        user.getResources().addAll(
                updateUser.getResources().stream()
                        .map(ResourceMapper::mapToResource)
                        .collect(Collectors.toList())
        );

        user.setStartDate(updateUser.getStartDate());
        user.setTargetCompletionDate(updateUser.getTargetCompletionDate());
        user.setEstimatedTime(updateUser.getEstimatedTime());
        user.setDifficultyLevel(updateUser.getEstimatedTime());
        user.setStatus(updateUser.getStatus());

        User updatedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(updatedUser);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()
                ->new ResourceNotFoundException("User is not exist with the given Id:"+userId));
        userRepository.deleteById(userId);
    }


    }

