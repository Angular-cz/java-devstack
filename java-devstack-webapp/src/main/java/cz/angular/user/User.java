package cz.angular.user;

import javax.net.ssl.SSLEngineResult;
import java.util.Date;

public class User {
  private long id;
  private String name;
  private String email;
  private Status status;
  private Address address;
  private Date date;

  public User(long id, String name, String email, Status status, Address address) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
    this.address = address;
  }

  public User() {
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }
}
