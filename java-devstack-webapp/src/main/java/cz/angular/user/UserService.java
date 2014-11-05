package cz.angular.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cz.angular.User;

@Bean
public class UserService {

	private HashMap<Integer, User> users;
	private static int idSeq = 1;

	public UserService() {
		users = new HashMap<Integer,User>();

		users.put(idSeq++, new User(idSeq, "Víťa Plšek"));
		users.put(idSeq++, new User(idSeq, "Milan Lempera"));

	}

	public Collection<User> getUsers() {
		return users.values();
	}
}
