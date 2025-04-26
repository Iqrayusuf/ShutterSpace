

/*package ShutterSpace.LearningPlan_backend.mapper;

import ShutterSpace.LearningPlan_backend.dto.UserDto;
import ShutterSpace.LearningPlan_backend.dto.ResourceDto;
import ShutterSpace.LearningPlan_backend.entity.User;
import ShutterSpace.LearningPlan_backend.mapper.ResourceMapper;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {
    public static UserDto mapToUserDto(User user) {
        List<ResourceDto> resourceDtos = user.getResources().stream()
                .map(ResourceMapper::mapToResourceDto)
                .collect(Collectors.toList());

        return new UserDto(
                user.getId(),
                user.getTitle(),
                user.getDescription(),
                user.getTopicsCovered(),
                resourceDtos,
                user.getStartDate(),
                user.getTargetCompletionDate(),
                user.getEstimatedTime(),
                user.getDifficultyLevel(),
                user.getStatus()
        );
    }
}
*/
/*package ShutterSpace.LearningPlan_backend.mapper;

import ShutterSpace.LearningPlan_backend.dto.UserDto;
import ShutterSpace.LearningPlan_backend.dto.ResourceDto;
import ShutterSpace.LearningPlan_backend.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        List<ResourceDto> resourceDtos = user.getResources().stream()
                .map(ResourceMapper::mapToResourceDto)
                .collect(Collectors.toList());

        return new UserDto(
                user.getId(),
                user.getTitle(),
                user.getDescription(),
                user.getTopicsCovered(),
                resourceDtos,
                user.getStartDate(),
                user.getTargetCompletionDate(),
                user.getEstimatedTime(),
                user.getDifficultyLevel(),
                user.getStatus()
        );
    }

    /*public static User mapToUser(UserDto userDto){
        return new User(

                userDto.getId(),
                userDto.getTitle(),
                userDto.getDescription(),
                userDto.getTopicsCovered(),
                resources,
                userDto.getStartDate(),
                userDto.getTargetCompletionDate(),
                userDto.getEstimatedTime(),
                userDto.getDifficultyLevel(),
                userDto.getStatus()

        );*/
    /*public static User mapToUser(UserDto userDto){
        List<Resource> resources = userDto.getResources().stream()
                .map(ResourceMapper::mapToResource)
                .collect(Collectors.toList());

        return new User(
                userDto.getId(),
                userDto.getTitle(),
                userDto.getDescription(),
                userDto.getTopicsCovered(),
                resources,
                userDto.getStartDate(),
                userDto.getTargetCompletionDate(),
                userDto.getEstimatedTime(),
                userDto.getDifficultyLevel(),
                userDto.getStatus()
        );
    }

    }
*/

package ShutterSpace.LearningPlan_backend.mapper;

import ShutterSpace.LearningPlan_backend.dto.UserDto;
import ShutterSpace.LearningPlan_backend.dto.ResourceDto;
import ShutterSpace.LearningPlan_backend.entity.User;
import ShutterSpace.LearningPlan_backend.entity.Resource;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        List<ResourceDto> resourceDtos = user.getResources().stream()
                .map(ResourceMapper::mapToResourceDto)
                .collect(Collectors.toList());

        return new UserDto(
                user.getId(),
                user.getTitle(),
                user.getDescription(),
                user.getTopicsCovered(),
                resourceDtos,
                user.getStartDate(),
                user.getTargetCompletionDate(),
                user.getEstimatedTime(),
                user.getDifficultyLevel(),
                user.getStatus()
        );
    }

    public static User mapToUser(UserDto userDto) {
        List<Resource> resources = userDto.getResources().stream()
                .map(ResourceMapper::mapToResource)
                .collect(Collectors.toList());

        return new User(
                userDto.getId(),
                userDto.getTitle(),
                userDto.getDescription(),
                userDto.getTopicsCovered(),
                resources,
                userDto.getStartDate(),
                userDto.getTargetCompletionDate(),
                userDto.getEstimatedTime(),
                userDto.getDifficultyLevel(),
                userDto.getStatus()
        );
    }
}
