package cz.angular;

import java.util.Collection;
import java.util.concurrent.atomic.AtomicLong;

import cz.angular.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

	private UserService userService;

    @RequestMapping("/user")
    public User greeting(@RequestParam(value="name", defaultValue="Světe") String name) {
        return new User(42, "No teda");
    }

	@RequestMapping("/users")
	public Collection<User> greeting() {
		return userService.getUsers();
	}


}