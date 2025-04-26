package ShutterSpace.LearningPlan_backend.controller;


import ShutterSpace.LearningPlan_backend.dto.UserDto;
import ShutterSpace.LearningPlan_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }


    //Build Get User Rest Api
    @GetMapping("{id}")
    public  ResponseEntity<UserDto> getUserById(@PathVariable("id")Long userId){
        UserDto userDto = userService.getUserById(userId);
        return new ResponseEntity<>(userDto,HttpStatus.OK);
    }

    //Buil Get All User
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> users = userService.getAllUsers();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
    // Build Updates User Rest API
    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id")Long userId,@RequestBody UserDto updatedUser){
        UserDto userDto = userService.updateUser(userId,updatedUser);
        return new ResponseEntity<>(userDto,HttpStatus.OK);
    }

    //Build Delete Employee Rest Api
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id")Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok("Employee Deleted Successfully!: ");

    }
}
