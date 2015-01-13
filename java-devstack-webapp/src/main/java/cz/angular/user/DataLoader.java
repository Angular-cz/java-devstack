package cz.angular.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * Created by vita on 12.01.15.
 */

@Component
public class DataLoader {

    @Autowired
    UserRepository userRepository;

    @PostConstruct
    public void defaultData() {
        createUser(new User("Martin Novák", "martin@novak.cz"));
        createUser(new User("Karel Novák", "karel@novak.cz"));
        createUser(new User("Karolína Nováková", "karolina@novak.cz", Status.CANCELLED));
        createUser(new User("Petr Vyskocil", "petr@vyskocil.cz", Status.PAID));
        createUser(new User("Jarek Párek", "parek@seznam.cz", Status.SENT));
    }

    private void createUser(User user) {
        userRepository.save(user);
    }

}
