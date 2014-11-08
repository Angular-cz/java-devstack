package cz.angular;

import java.util.Collection;
import java.util.concurrent.atomic.AtomicLong;

import cz.angular.user.User;
import cz.angular.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

  private static final String template = "Hello, %s!";
  private final AtomicLong counter = new AtomicLong();

  @Autowired
  private UserService userService;

  @RequestMapping(value = "/user", method= RequestMethod.GET)
  public Collection<User> getUsers() {
    return userService.getUsers();
  }

  @RequestMapping(value = "/user/{id}", method= RequestMethod.GET)
  public User getUser(@PathVariable Long id) {
    return userService.getUser(id);
  }

  @RequestMapping(value = "/user/{id}", method= RequestMethod.DELETE)
  public void removeUser(@PathVariable Long id) {
    userService.removeUser(id);
  }

  @RequestMapping(value = "/user/{id}", method= RequestMethod.POST)
  public User updateUser(@PathVariable Long id, @RequestBody User user) {
    return userService.updateUser(id, user);
  }
}