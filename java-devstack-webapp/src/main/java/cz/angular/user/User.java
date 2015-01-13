package cz.angular.user;

import javax.persistence.*;
import java.util.Date;

@Entity
public class User {
  @Id
  @GeneratedValue
  private Long id;

  @Column
  private String name;
  @Column
  private String email;
  @Column
  private Status status;

  @Column
  private Date date;

  public User(String name, String email) {
    this(name, email, Status.NEW);
  }

  public User(String name, String email, Status status) {
    this.name = name;
    this.email = email;
    this.status = status;

    if (this.status == Status.SENT) {
      this.setDate(new Date());
    }
  }

  public User() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
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

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }
}