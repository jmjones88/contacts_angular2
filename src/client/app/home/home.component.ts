import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from '../shared/contact/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  contacts: Contact[] = [];
  type: String;
  name: String;
  title: String;
  phone: String;
  ext: String;
  fax: String;
  email: String;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public contactService: ContactService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getItems();
  }

  checkItem(e: any, contact: Contact) {
    contact.isChecked = e.target.checked;
  }

  /**
   * Handle the contactService observable
   */
  getItems() {
    this.contactService.get()
      .subscribe(
        contacts => this.contacts = contacts,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    //this.contacts.push(this.newName);
    this.newName = '';
    return false;
  }

  removeItems() {
    let returnContactsArr = this.contactService.removeItems(this.contacts);
    this.contacts = returnContactsArr;
  }

  addEntry() {
    let contact = new Contact(this.type, this.name, this.title, this.phone, this.ext, this.fax, this.email)
    this.contacts.push(contact);
    this.contactService.add(this.contacts);
  }

}
