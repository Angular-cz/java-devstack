package cz.angular.user;

public class Address {
  private String street;
  private String city;
  private String zip;

  public Address() {
  }

  public String getStreet() {
    return street;
  }

  public void setStreet(String street) {
    this.street = street;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getZip() {
    return zip;
  }

  public void setZip(String zip) {
    this.zip = zip;
  }

  public Address(String street, String city, String zip) {
    this.street = street;
    this.city = city;
    this.zip = zip;


  }
}
