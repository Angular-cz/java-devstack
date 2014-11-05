package cz.angular;

/**
 * Created by vita on 26.10.14.
 */
public class User {
    public int id;
    public String name;

    public User(int id, String name) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public int getId(){
        return id;
    }

}
