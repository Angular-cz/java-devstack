package cz.angular.user;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;

import org.springframework.stereotype.Component;

@Component
public class UserService {

	private HashMap<Long, User> users;
	private static Long idSeq = 0L;

	public UserService() {
		users = new HashMap<Long,User>();

    createUser("Víťa Plšek", "vita@angular.cz", "Na kovárně 11", "Brno", "644 00");
    createUser("Milan Lempera", "milan@angular.cz", "Fiktivní 1653", "Vysočina", "65 423");
    createUser("Petr Novák", "petr@novak.cz", "Větrná 1380", "Praha 4", "10 000");
    createUser("Jaroslav Novák", "jarek@novak.cz", "Větrná 1380", "Praha 4", "10 000");
    createUser("Martin Novák", "martin@novak.cz", "Větrná 1380", "Praha 4", "10 000");
    createUser("Karolína Nováková", "karolina@novak.cz", "Větrná 1380", "Praha 4", "10 000");
  }

  private Address createUser(String name, String email, String street, String city, String zip) {
    Address address = new Address(street, city, zip);
    users.put(++idSeq, new User(idSeq, name, email, Status.NEW, address));
    return address;
  }

  public Collection<User> getUsers() {
		return users.values();
	}

  public User getUser(Long id) {

    if (!users.containsKey(id)) {
      throw new IndexOutOfBoundsException();
    }

    return users.get(id);
  }

  public void removeUser(Long id) {
    if (!users.containsKey(id)) {
      throw new IndexOutOfBoundsException();
    }

    users.remove(id);
  }

  public User updateUser(Long id, User user) {
    users.put(id, user);

    if (user.getStatus().equals(Status.SENT)) {
      user.setDate(new Date());
    } else {
      user.setDate(null);
    }

    return user;
  }
}
