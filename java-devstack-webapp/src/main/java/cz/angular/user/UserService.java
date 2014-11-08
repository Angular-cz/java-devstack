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

    Address address = new Address("Neznámá", "Neznámé", "Zip");
		users.put(++idSeq, new User(idSeq, "Víťa Plšek", "vita@angular.cz", Status.NEW, address));
		users.put(++idSeq, new User(idSeq, "Milan Lempera", "milan@angular.cz", Status.PAID, address));
    users.put(++idSeq, new User(idSeq, "Petr Novák", "petr@novak.cz", Status.NEW, address));
    users.put(++idSeq, new User(idSeq, "Jaroslav Novák", "jarek@novak.cz", Status.NEW, address));
    users.put(++idSeq, new User(idSeq, "Martin Novák", "martin@novak.cz", Status.NEW, address));
    users.put(++idSeq, new User(idSeq, "Karolína Nováková", "karolina@novak.cz", Status.NEW, address));


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
