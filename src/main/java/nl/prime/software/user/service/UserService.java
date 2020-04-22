package nl.prime.software.user.service;

import nl.prime.software.user.model.User;
import nl.prime.software.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service // Instruct Spring Boot that this is the Service layer
public class UserService {

    // Import Methods from other Class
    private final UserRepository userRepository; // Class from which methods are being imported

    // Make methods accessible via this constructor
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() { // Generate function
        List<User> users = new ArrayList<>();
        userRepository.findAll() // Call JPA function via the Repository
                .forEach(users::add);
        return users;
    }

    public Optional<User> getUserById(Long id) { // Generate function
        return userRepository.findById(id); // Call JPA function via the Repository
    }

    public void addUser(User user) { // Generate function
        userRepository.save(user); // Call JPA function via the Repository
    }

    public void updateUser(User user) { // Generate function
        userRepository.save(user); // Call JPA function via the Repository
    }

    public void deleteUser(Long id) { // Generate function
        userRepository.deleteById(id); // Call JPA function via the Repository
    }

}
