package cz.angular;

import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;

import cz.angular.user.Status;
import cz.angular.user.User;
import cz.angular.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

  private static final String template = "Hello, %s!";
  private final AtomicLong counter = new AtomicLong();

  @Autowired
  private UserRepository userRepository;

  @RequestMapping(value = "/orders", method= RequestMethod.GET)
  public Iterable<User> getUsers() {
    return userRepository.findAll();
  }

  @RequestMapping(value = "/orders", method= RequestMethod.POST)
  public User createUser(@RequestBody User user) {

    user.setStatus(Status.NEW);
    return userRepository.save(user);
  }

  @RequestMapping(value = "/orders/{id}", method= RequestMethod.GET)
  public User getUser(@PathVariable Long id) {
    return userRepository.findOne(id);
  }

  @RequestMapping(value = "/orders/{id}", method= RequestMethod.DELETE)
  public void removeUser(@PathVariable Long id) {
    userRepository.delete(id);
  }

  @RequestMapping(value = "/orders/{id}", method= RequestMethod.POST)
  public User updateUser(@PathVariable Long id, @RequestBody User user) {

    User userInDb = userRepository.findOne(id);

    userInDb.setName(user.getName());
    userInDb.setEmail(user.getEmail());

    if (user.getStatus() == Status.SENT && hasStatusChanged(user, userInDb)) {
      userInDb.setDate(new Date());
    }
    userInDb.setStatus(user.getStatus());

    return userRepository.save(userInDb);
  }

  private boolean hasStatusChanged(User user, User userInDb) {
    return user.getStatus() != userInDb.getStatus();
  }
}